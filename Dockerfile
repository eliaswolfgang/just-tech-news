# Use the official MySQL base image
FROM mysql:8.0

# Set environment variables for MySQL root password and database
# Replace 'your_root_password' and 'your_database_name' with your desired values
ENV MYSQL_ROOT_PASSWORD=IVmysql123!
ENV MYSQL_DATABASE=just_tech_news_db

# Optional: Copy SQL initialization scripts into the container
# MySQL will automatically execute .sql files placed in /docker-entrypoint-initdb.d/
# For example, create a 'initdb' directory in your project and place your .sql files there
COPY initdb/ /docker-entrypoint-initdb.d/

# Expose the default MySQL port
EXPOSE 3306

# The entrypoint script of the official MySQL image handles the database initialization
# and starts the MySQL server. No CMD instruction is typically needed