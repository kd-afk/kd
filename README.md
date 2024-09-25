# kd
This repo contains my all project.
To  run these projects you need to install node js 
Open Powershell as adminstrator and run these command to install node js.

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

This is mssql query for creating users table 
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
