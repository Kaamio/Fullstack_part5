describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const testuser = {
      name: 'karppi',
      username: 'lahna',
      password: 'kiiski'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', testuser)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Log in to Application')
    cy.get('#login-button')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('lahna')
      cy.get('#password').type('kiiski')
      cy.get('#login-button').click()
      cy.contains('karppi logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('lahna')
      cy.get('#password').type('wroooong')
      cy.get('#login-button').click()
      cy.contains('wrong credentials')
    })
    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'lahna', password: 'kiiski' })
        })
    
        it('A blog can be created', function() {
         cy.contains('new blog').click()
         cy.get('#title').type('echo')
         cy.get('#author').type('sierra')
         cy.get('#blogurl').type('nevada')
         cy.get('#submit-create-blog').click()

         cy.get('#blogs')         
         .contains('echo - sierra')
         
        })
        
        it('A blog can be liked', function() {
          cy.createBlog({ title: 'kala', author:'kalassa', url:'kalaan', user: 'testuser' })

          cy.contains('show').click()
          cy.contains('0')
          cy.get('#like_button').click()
          cy.contains('1')
        })

        it('A blog can be deleted by the user that added it', function() {
          cy.createBlog({ title: 'kala', author:'kalassa', url:'kalaan',likes:0, user: 'testuser' })
          cy.contains('show').click()             
          cy.contains('remove').click()          
          cy.get('#blogs').should('not.contain', 'kala - kalassa')                  
        })

        it('Created blogs are sorted by likes', function() {
          
          cy.createBlog({ title: 'kala', author:'kalassa', url:'kalaan', likes:1, user: 'testuser' })
          cy.createBlog({ title: 'kala2', author:'kalassa2', url:'kalaan2', likes:3, user: 'testuser' })
          cy.createBlog({ title: 'kala3', author:'kalassa3', url:'kalaan3', likes:2, user: 'testuser' })
         
          cy.get('.blogShort').find('#show').then( button => {  
            cy.wrap(button[0]).click()            
            cy.wrap(button[1]).click()            
            cy.wrap(button[2]).click()
          
            cy.get('.blogLong').then(blogs=> {             
              cy.wrap(blogs[0]).should("contain", 'likes: 3')
              cy.wrap(blogs[1]).should("contain", 'likes: 2')
              cy.wrap(blogs[2]).should("contain", 'likes: 1')
            });  

          }) 
        })   
    })
    
})
})
