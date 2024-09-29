from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request, HTTPException
from starlette.responses import JSONResponse
from backend.utils.security import verify_token
from backend.utils.logging import logger  # Import the logger

class JWTAuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        try:
            # Skip OPTIONS method (preflight CORS requests)
            if request.method == "OPTIONS":
                return await call_next(request)

            # Skip certain routes like login and signup
            if request.url.path in ["/auth/login", "/auth/signup"]:
                return await call_next(request)

            # Extract the JWT token from headers
            auth_header = request.headers.get("Authorization")
            if auth_header is None:
                logger.warning("Missing token in request")  # Log missing token
                raise HTTPException(status_code=401, detail="Missing token")
            
            # Expecting 'Bearer <token>'
            token = auth_header.split(" ")[1] if "Bearer" in auth_header else None
            if not token:
                logger.warning("Invalid token format in request")  # Log invalid token format
                raise HTTPException(status_code=401, detail="Invalid token format")

            # Verify the token
            user_email = verify_token(token)
            if not user_email:
                logger.error("Invalid or expired token")  # Log token verification failure
                raise HTTPException(status_code=401, detail="Invalid token or token expired")
            
            # Attach user email to the request state for further use
            request.state.user_email = user_email
            logger.info(f"Token verified for {user_email}")  # Log successful verification

            # Proceed with the request
            response = await call_next(request)
            return response

        except HTTPException as exc:
            logger.error(f"Request failed: {exc.detail}")  # Log HTTP exception
            # Return JSON response for HTTP exceptions
            return JSONResponse(
                status_code=exc.status_code, 
                content={"detail": exc.detail}
            )
