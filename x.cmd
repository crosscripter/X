@echo off
tar -xzf lib 
node x.js %* 
del *.xsm *.js