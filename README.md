# kd
This repo contains my all project.
To  run these projects you need to install node js 
Open Powershell as adminstrator and run these command to install node js.
```
# installs fnm (Fast Node Manager)
winget install Schniz.fnm
# configure fnm environment
fnm env --use-on-cd | Out-String | Invoke-Expression
# download and install Node.js
fnm use --install-if-missing 20
# verifies the right Node.js version is in the environment
node -v # should print `v20.17.0`
# verifies the right npm version is in the environment
npm -v # should print `10.8.2`
```

1.Query to create users table 

```
CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,  -- Auto-incrementing primary key
    username NVARCHAR(100) NOT NULL UNIQUE, -- Username (required and unique)
    email NVARCHAR(255) NOT NULL UNIQUE,   -- Email (required and unique)
    password NVARCHAR(255) NOT NULL,   -- Password (hashed and required)
    fname NVARCHAR(100)NOT NULL,               -- First name of the user
    lname NVARCHAR(100) ,       -- Last name (required)
    mNumber NVARCHAR(20) NOT NULL,    -- Mobile number (required)
    address NVARCHAR(255),        -- Address (required)
	profilePicture nvarchar(255),    -- Profile photo stored as binary data
    resetPasswordToken NVARCHAR(255),                  -- Reset password token
    tokenExpirationTime DATETIME,
    SignupDate DATETIME DEFAULT GETDATE()  -- Automatically capture signup date
);
```

2. Queries to create stored procedure
2.1 CheckUsernameAvailability

```
CREATE PROCEDURE [dbo].[CheckUsernameAvailability]
    @username NVARCHAR(100)
AS
BEGIN
    -- Start the procedure to check username availability
    BEGIN TRY
        -- Select the count of users where the username matches the provided input
        SELECT COUNT(*) AS UserCount
        FROM users
        WHERE username = @username;
    END TRY
    BEGIN CATCH
        -- In case of an error, raise it
        THROW;
    END CATCH
END;
```

2.2 RequestPasswordReset

```
CREATE PROCEDURE [dbo].[RequestPasswordReset]
    @email NVARCHAR(255),
    @token NVARCHAR(255),
    @expires DATETIME
AS
BEGIN
    -- Start the procedure to request password reset
    BEGIN TRY
        -- Check if the user with the provided email exists
        IF EXISTS (SELECT 1 FROM Users WHERE email = @email)
        BEGIN
            -- Update the user's reset token and expiration time
            UPDATE users
            SET resetPasswordToken = @token,
                tokenExpirationTime = @expires
            WHERE email = @email;
            
            -- Return success result
            SELECT 1 AS Result;
        END
        ELSE
        BEGIN
            -- No account found with the provided email
            SELECT 0 AS Result;
        END
    END TRY
    BEGIN CATCH
        -- In case of an error, raise it
        THROW;
    END CATCH
END;
```

2.3 spAuthenticateUser

```
CREATE PROCEDURE [dbo].[spAuthenticateUser]
    @email NVARCHAR(255)
AS
BEGIN
    -- Start the procedure to fetch user by email or username
    BEGIN TRY
        -- Select user data (including hashed password) where the email or username matches the provided input
        SELECT *
        FROM users
        WHERE email = @email OR username = @email;
    END TRY
    BEGIN CATCH
        -- In case of an error, raise it
        THROW;
    END CATCH
END;
```

2.4 spCreateUser

```
CREATE PROCEDURE [dbo].[spCreateUser]
    @username NVARCHAR(100),
    @email NVARCHAR(255),
    @password NVARCHAR(255),
    @fname NVARCHAR(100),
    @lname NVARCHAR(100),
    @mNumber NVARCHAR(20),
    @address NVARCHAR(255)
AS
BEGIN
        -- Insert the user's data into the Users table
        INSERT INTO users (username, email, password, fname, lname, mNumber, address, SignupDate)
        VALUES (@username, @email, @password, @fname, @lname, @mNumber, @address, GETDATE());

END;
```

2.5 UpdateUserProfile

```
CREATE PROCEDURE [dbo].[UpdateUserProfile]
    @id INT,
    @fname NVARCHAR(100),
    @lname NVARCHAR(100),
    @email NVARCHAR(255),
    @mNumber NVARCHAR(20),
    @address NVARCHAR(255),
    @profilePicture NVARCHAR(255)
AS
BEGIN
    -- Start the procedure to update the user profile
    BEGIN TRY
        -- Update the user's profile details where the UserID matches the provided input
        UPDATE users
        SET fname = @fname,
            lname = @lname,
            email = @email,
            mNumber = @mNumber,
            address = @address,
            profilePicture = @profilePicture
        WHERE id = @id;
    END TRY
    BEGIN CATCH
        -- In case of an error, raise it
        THROW;
    END CATCH
END;
```
