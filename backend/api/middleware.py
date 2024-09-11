# backend/api/middleware.py
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request, HTTPException
from starlette.responses import JSONResponse
from backend.utils.security import verify_token

class JWTAuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        try:
            # Skip certain routes like login and signup
            if request.url.path in ["/auth/login", "/auth/signup"]:
                return await call_next(request)

            # Extract the JWT token from headers
            auth_header = request.headers.get("Authorization")
            if auth_header is None:
                raise HTTPException(status_code=401, detail="Missing token")
            
            # Expecting 'Bearer <token>'
            token = auth_header.split(" ")[1] if "Bearer" in auth_header else None
            if not token:
                raise HTTPException(status_code=401, detail="Invalid token format")

            # Verify the token
            user_email = verify_token(token)
            if not user_email:
                raise HTTPException(status_code=401, detail="Invalid token or token expired")
            
            # Attach user email to the request state for further use
            request.state.user_email = user_email

            # Proceed with the request
            response = await call_next(request)
            return response

        except HTTPException as exc:
            # Return JSON response for HTTP exceptions
            return JSONResponse(
                status_code=exc.status_code, 
                content={"detail": exc.detail}
            )
