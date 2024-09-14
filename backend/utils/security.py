from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt  # PyJWT works with the 'jose' library for encoding and decoding
from backend.utils.config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
from passlib.context import CryptContext
from backend.utils.logging import logger  # Import the logger

# Password encryption context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Function to create an access token
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    # Log token creation
    logger.info(f"Creating JWT token for {data['sub']}")
    
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Function to verify JWT token
def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise JWTError("Invalid token")
        
        # Log successful token verification
        logger.info(f"JWT token verified for {email}")
        return email
    except JWTError:
        # Log token verification failure
        logger.error("JWT token verification failed")
        return None

# Function to hash passwords
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

# Function to verify passwords
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)
