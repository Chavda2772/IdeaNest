@ECHO off

REM Path Variables 
set projectPath=%cd%
set frontendLocation=%projectPath%\frontend
set frontendPublic=%frontendLocation%\public
set frontendbuild=%frontendLocation%\dist\browser

set backendLocation=%projectPath%\backend
set staticPath=%backendLocation%\public
set buildFolder=%projectPath%\build

Title Prepare build

REM build project files
ECHO ---------------- Build Process started ---------
cd %frontendLocation%
call npm run build

REM Copy build application file to backend folder
ECHO ---------------- Copy Operation Started -----------------
if exist "%staticPath%" rmdir /Q /S "%staticPath%\"
mkdir "%staticPath%"

xcopy "%frontendbuild%" "%staticPath%" /K /S /D /H /Y

if exist "%buildFolder%" rmdir /Q /S "%buildFolder%"
mkdir "%buildFolder%"

xcopy "%backendLocation%" "%buildFolder%" /EXCLUDE:%projectPath%\exclude.txt /E /I /H /Y
ECHO ---------------- Operation Completed Successfully -----------------

ECHO All build files are copy to "%buildFolder%"

REM Open Location
explorer.exe "%buildFolder%"
PAUSE
EXIT