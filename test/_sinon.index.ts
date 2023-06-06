import { server} from "../src/index"

import chai from "chai"
import chaiHttp from "chai-http"
import sinon from "sinon"
import { userModel } from "../src/models/users"
import { IUser } from "../src/interfaces/user.interface"
import { helpers } from "../src/helpers/helpers"

chai.use(chaiHttp);

const expect = chai.expect

describe("Application tests", ()=> {
    it("Server is online", (done)=> {
        chai.request(server)
            .get('/')
            .end((err, res)=>{
                expect(err).to.be.null
                expect(res).to.have.status(200)
                done() 
            })
    })

    it("deveria ser uma lista vazia de usuarios", (done)=> {
        chai.request(server)
            .get("/users")
            .end((err, res)=>{             
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.deep.equal([])
                done() 
        })
    })

    it("Deveria criar um usuario Caue", (done) => {
      const user: IUser = {
        id: 1,
        name: "Caue Santos",
        email: 'caue.santos@example.com',
        birthdate: helpers.convertStringToDate("1996/09/28"),
        createdOn: new Date(),
        updatedOn: new Date(),
      };

      const createStub = sinon.stub(userModel, "create");
      createStub.returns(Promise.resolve(user));

      chai.request(server)
        .post("/users")
        .send({name: "Caue Santos", email: "caue.santos@example.com", birthdate: "1996/09/28" })
        .end((err, res) => {
          
          expect(res).to.have.status(201);
          expect(res.body).to.be.a("object");
          expect(res.body.name).to.equal(user.name)
          expect(res.body.email).to.equal(user.email)
          expect(res.body.birthdate).to.equal(user.birthdate.toISOString())
          createStub.restore();

          done();
        });
    });

    it("should remove the specified user", (done) => {
      const userId = 1;

      const removeStub = sinon.stub(userModel, "remove");
      removeStub.withArgs(userId).returns(Promise.resolve());

      chai.request(server)
        .delete(`/users/${userId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          removeStub.restore();
          done();
        });
    });

    it("Econtrar um unico usuario", (done) => {
      const user = {
        id: 1,
        name: "Caue Santos",
        email: "caue@example.com",
        birthdate: helpers.convertStringToDate("2000/05/08"),
        createdOn: new Date(),
        updatedOn: new Date(),
      }
    
      const findOneStub = sinon.stub(userModel, "findOne").resolves(user)
    
      chai.request(server)
        .get("/users/" + user.id)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200);
          expect(res.body.name).to.equal("Caue Santos")
          expect(res.body.email).to.equal("caue@example.com")
          expect(res.body.id).to.equal(1)
          findOneStub.restore();
    
          done();
        });
    });
    

    it("should return all users", (done) => {
      const users = [
        {
          id: 1,
          name: "Caue Santos",
          email: "caue.santos@example.com",
          birthdate: helpers.convertStringToDate("2000/05/08"),
          createdOn: new Date(),
          updatedOn: new Date(),
        },
        {
          id: 1,
          name: 'Carlos Santos',
          email: 'carlos.rafael@example.com',
          birthdate: helpers.convertStringToDate("2000/05/08"),
          createdOn: new Date(),
          updatedOn: new Date(),
        },        {
          id: 1,
          name: 'Caio Santos',
          email: 'caio@example.com',
          birthdate: helpers.convertStringToDate("2000/05/08"),
          createdOn: new Date(),
          updatedOn: new Date(),
        },
      ];

      const findAllStub = sinon.stub(userModel, "findAll");
      findAllStub.returns(Promise.resolve(users));

      chai.request(server)
        .get("/users")
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(3)

          findAllStub.restore();

          done();
        });
      })

      it("should update the specified user", (done) => {
        const user = {
          id: 1,
          name: "Caue Santos",
          email: "caue@example.com",
          birthdate: helpers.convertStringToDate("2000/05/08"),
          createdOn: new Date(),
          updatedOn: new Date(),
        }
        const updatedUser = {
          id: 1,
          name: "Caue R. Santos",
          email: "caue@example.com",
          birthdate: helpers.convertStringToDate("2000/05/08"),
          createdOn: new Date(),
          updatedOn: new Date(),
        }
        const updateData = { name: "Caue R. Santos"};
  
        const findOneStub = sinon.stub(userModel, 'findOne').resolves(user)
  
        const updateStub = sinon.stub(userModel, "update").resolves(updatedUser)
  
        chai.request(server)
          .put(`/users/${user.id}`)
          .send(updateData)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a("object");
            expect(res.body.name).to.equal(updatedUser.name)
            expect(res.body.name).to.not.equal(user.name)

            findOneStub.restore();
            updateStub.restore();
  
            done();
          });
      });


})



  




