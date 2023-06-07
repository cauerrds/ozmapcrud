/* eslint-disable import/no-named-as-default-member */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-unused-expressions */
import chai from 'chai'
import chaiHttp from 'chai-http'
import chaiJsonSchema = require('chai-json-schema')
import { server } from '../src/index'
import { testModel } from '../src/models/test'

chai.use(chaiHttp);
chai.use(chaiJsonSchema);

const userSchema = {
    title: 'Schema do Usuario, define como é o usuario, linha 24 do teste',
    type: 'object',
    required: ['name', 'email', 'age', 'id', 'createdOn', 'updatedOn', 'birthdate'],
    properties: {
        name: {
            type: 'string'
        },
        email: {
            type: 'string'
        },
        age: {
            type: 'number',
            minimum: 18
        },
        id: {
            type: 'number'
        },
        createdOn: {
            type: 'string'
        },
        updatedOn: {
            type: 'string'
        },
        birthdate: {
            type: 'string'
        }

    }
}

const { expect } = chai

describe('Testes da aplicacao', function () {
    this.afterAll(() => {
        testModel.resetDb()
    })

    it('O servidor está online', done => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    for (let i = 0; i < 10; i++) {
        it(`Deveria criar o usuário Caue${i}`, done => {
            const user = {
                name: `Caue${i}`,
                email: `caue${i}@teste.com`,
                birthdate: '1996/09/28'
            }
            chai.request(server)
                .post('/users')
                .send(user)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    expect(res.body.name).to.equal(`Caue${i}`)
                    expect(res.body.email).to.equal(`caue${i}@teste.com`)
                    expect(res.body.age).to.equal(26)
                    expect(res.body).to.be.jsonSchema(userSchema)
                    done();
                });
        });
    }

    it('Não deve criar usuário menor de 18 anos', done => {
        const user = {
            name: 'Caue',
            email: 'caue@teste.com',
            birthdate: '2006/09/28'
        }
        chai.request(server)
            .post('/users')
            .send(user)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.body).to.have.status(400);
                expect(res.body.message).to.equal('Minimum age 18')
                done();
            });
    });

    it('Não deve criar usuário com nome usado', done => {
        const user = {
            name: 'Caue1',
            email: 'caue123@teste.com',
            birthdate: '2000/09/28'
        }
        chai.request(server)
            .post('/users')
            .send(user)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.body).to.have.status(400);
                expect(res.body.message).to.equal('Unique constraint violation: name or email')
                done();
            });
    });

    it('Não deve criar usuário com email usado', done => {
        const user = {
            name: 'Caue r',
            email: 'caue1@teste.com',
            birthdate: '2000/09/28'
        }
        chai.request(server)
            .post('/users')
            .send(user)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.body).to.have.status(400);
                expect(res.body.message).to.equal('Unique constraint violation: name or email')
                done();
            });
    });

    it('Usuário com id 1 existe e é valido', done => {
        chai.request(server)
            .get('/users/1')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.jsonSchema(userSchema);
                done();
            });
    });

    it('Usuário com Caue2 existe e é valido', done => {
        chai.request(server)
            .get('/users/Caue2')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.jsonSchema(userSchema);
                done();
            });
    });

    it('Deveria excluir o usuário com id 1', done => {
        chai.request(server)
            .delete('/users/1')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    it('Usuário com id 1 nao existe', done => {
        chai.request(server)
            .get('/users/1')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.body).to.have.status(404);
                expect(res.body.message).to.equal('User not found')
                done();
            });
    });

    it('Deveria ser uma lista com pelo menos 5 usuários', done => {
        chai.request(server)
            .get('/users')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body.length).to.be.at.least(5);
                done();
            });
    });

    it('Deveria retornar uma lista na página 1 com 5 usuários, parâmetros inválidos', done => {
        chai.request(server)
            .get('/users?page=ozmap&pageSize=[teste, caue, ozmap]')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body.length).to.be.at.least(5);
                done();
            });
    });
})
