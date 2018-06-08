'use strict';function _asyncToGenerator(a){return function(){var b=a.apply(this,arguments);return new Promise(function(c,d){function f(g,h){try{var k=b[g](h),l=k.value}catch(m){return void d(m)}return k.done?void c(l):Promise.resolve(l).then(function(m){f('next',m)},function(m){f('throw',m)})}return f('next')})}}$(_asyncToGenerator(regeneratorRuntime.mark(function a(){var b,c,d,f,g,h,k,l,m,n,o,p,q,r,s,t,u,v,w,x;return regeneratorRuntime.wrap(function(z){for(;;)switch(z.prev=z.next){case 0:return z.prev=0,z.next=3,getAllNodesInfo();case 3:if(b=z.sent,c=b.getAll,d=b.getType,c.code!==CODE.SUCCESS){z.next=13;break}for(f=c.data.nodes,DEBUG&&(console.log('\u670D\u52A1\u5668\u53D1\u9001\u8282\u70B9\u6570\u636E'),console.log(f)),g=0;g<f.length;g++)originalIdToPageId[f[g].trim()]=g,pageIdToOriginalId[g]=f[g].trim();DEBUG&&(console.log('\u524D\u7AEF\u6620\u5C04'),console.log(originalIdToPageId)),z.next=15;break;case 13:return z.next=15,showNotice(c.msg);case 15:if(d.code!==CODE.SUCCESS){z.next=21;break}for(m in h=d.data,k=DEVICE,l=k.TYPE,h)h.hasOwnProperty(m)&&(m=m.trim(),n=originalIdToPageId[m],o=h[m],p=$('.icon[data-nodeid='+n+']'),p.attr('data-deviceType',h[m]),p.css('background-image','url(\'./images/'+l[o]+'.png\')'));z.next=23;break;case 21:return z.next=23,showNotice(d.msg);case 23:z.next=30;break;case 25:return z.prev=25,z.t0=z['catch'](0),console.log(z.t0),z.next=30,showNotice(MSG.ERROR).catch(function(A){console.log(A)});case 30:if(z.prev=30,!DEBUG){z.next=52;break}for(q=$('.icon'),r=!0,s=!1,t=void 0,z.prev=36,u=q[Symbol.iterator]();!(r=(v=u.next()).done);r=!0)w=v.value,x=$(w).attr('data-deviceType'),x&&($(w).text(DEVICE.NAME_FOR_TEST[x]),$(w).css({fontSize:'0.5rem',lineHeight:'2rem',verticalAlign:'40%'}));z.next=44;break;case 40:z.prev=40,z.t1=z['catch'](36),s=!0,t=z.t1;case 44:z.prev=44,z.prev=45,!r&&u.return&&u.return();case 47:if(z.prev=47,!s){z.next=50;break}throw t;case 50:return z.finish(47);case 51:return z.finish(44);case 52:return z.finish(30);case 53:case'end':return z.stop();}},a,void 0,[[0,25,30,53],[36,40,44,52],[45,,47,51]])}))),$(function(){var a=io('http://'+SERVER.DOMAIN+':'+SERVER.PORT);a.on('connect',function(){console.log('socket \u8FDE\u63A5\u6210\u529F')}),a.on('disconnect',function(){console.log('socket \u65AD\u5F00\uFF0C\u8FDB\u884C\u91CD\u8FDE')}),a.on('nodeStatus',function(b){var c,d,f={},_iteratorNormalCompletion2=!0,_didIteratorError2=!1,_iteratorError2=void 0;try{for(var p,o=b[Symbol.iterator]();!(_iteratorNormalCompletion2=(p=o.next()).done);_iteratorNormalCompletion2=!0){var q=p.value,g=q.startNode,h=q.endNode;c=originalIdToPageId[g],d=originalIdToPageId[h],f[c+'-'+d]=!0}}catch(r){_didIteratorError2=!0,_iteratorError2=r}finally{try{!_iteratorNormalCompletion2&&o.return&&o.return()}finally{if(_didIteratorError2)throw _iteratorError2}}for(var k in f)if(f.hasOwnProperty(k)){var l=k.split('-');Object.is(f[l[1]+'-'+l[0]],void 0)?delete f[k]:parseInt(l[0])>parseInt(l[1])&&delete f[k]}DEBUG&&(console.log('\u65B0\u7684\u8FDE\u63A5\u72B6\u6001'),console.log(f));for(var m=0;42>m;m++)for(var n=m+1;48>n&&6>=n-m;n++)(1==n-m||6==n-m)&&(Object.is(f[m+'-'+n],void 0)?$('.line[data-connectnodes='+m+'-'+n+']').removeClass('connected'):!0===f[m+'-'+n]&&$('.line[data-connectnodes='+m+'-'+n+']').addClass('connected'))})});