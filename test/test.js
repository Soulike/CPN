/*
 * Created by liuchaorun
 * Date 18-5-23
 * Time 上午10:59
 **/
let server = require('../index').listen(3000);
let request = require('supertest');

describe('#test router',()=>{
	it('#test getAll',()=>{
		request(server)
			.get('/cpn/nodes/getAll')
			.end((err,res)=>{
				if(err) console.log(err);
				else console.log(res.body);
			})
	});

	it('#test getType',()=>{
		request(server)
			.get('/cpn/nodes/getType')
			.end((err,res)=>{
				if(err) console.log(err);
				else console.log(res.body);
			})
	})
});