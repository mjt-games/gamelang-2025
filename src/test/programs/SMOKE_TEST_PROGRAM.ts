export const SMOKE_TEST_PROGRAM = `
# this is a comment above the program

# This is a comment
// This is another comment
abc=12 #third comment
abc= "test 123"
abc= 'test xyz'
abc= 12.34
abc = yes
abc = false
abc = 2023.10.12
abc = 23:59:42
abc = 23:59
abc = 2023.*.12
abc = 23:*
abc = 23:*:42
abc = { a=1
  a= 2 
  b= {z="test"}
  c=3
}
abc.foo = {1 2 3}

`;
