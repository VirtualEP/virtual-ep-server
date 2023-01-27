Routes  & Methods

BASEPATH = "http://localhost:{port}/api"

#Auth Endpoint:
   ## path = /auth
    - login
        path = /login
        method : POST
        body: { email , password }
        reponse : 200 OK {token:"",message:""}
    - register
        path = /register
        method : POST
        body: { email , password,firstName,lastName,country}
        reponse : 200 OK {message:""}
    
    