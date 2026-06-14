# Gunakan image Python resmi
FROM python:3.9

# Buat user non-root untuk keamanan (direkomendasikan oleh Hugging Face)
RUN useradd -m -u 1000 user
USER user
ENV PATH="/home/user/.local/bin:$PATH"

# Set working directory
WORKDIR /app

# Copy requirements.txt dan install dependencies
COPY --chown=user ./requirements.txt requirements.txt
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Copy seluruh kode ai-service
COPY --chown=user . /app

# Jalankan aplikasi FastAPI di port 7860 (Wajib untuk Hugging Face Spaces)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
