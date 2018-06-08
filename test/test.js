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
	});

	it('#test get',()=>{
		request(server)
			.get('/cpn/node/get?id=8666683506aacd900bbd5a74ac4edf00')
			.end((err,res)=>{
				if(err) console.log(err);
				else console.log(res.body);
			})
	});

	it('#test modify', function () {
		request(server)
			.post('/cpn/node/modify')
			.send({
				id: '8666683506aacd900bbd5a74ac4edf00',
				data: {
					'0297': 'TTTTTTTT',
					'0298': 'TTTTTTTT'
				}
			})
			.end((err,res)=>{
				if(err) console.log(err);
				else console.log(res.body);
			})
	});
});