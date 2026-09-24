from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Corrected connection string
db_url = "postgresql://postgres:123456789@localhost:5432/postgres"

# Create database engine
engine = create_engine(db_url)

# Create session maker bound to the engine
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
