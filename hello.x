# Create alias for ++ concatenation op
cat = ++

# Extract expression out to op
exclaim = '!' cat 

# Define some "variables"
greeting = 'Hello, '
target = 'World'

# Main program, print out concatenated string excalimed
greeting target cat exclaim .