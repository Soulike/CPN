'use strict';function _asyncToGenerator(a){return function(){var b=a.apply(this,arguments);return new Promise(function(d,f){function g(h,i){try{var j=b[h](i),k=j.value}catch(l){return void f(l)}return j.done?void d(k):Promise.resolve(k).then(function(l){g('next',l)},function(l){g('throw',l)})}return g('next')})}}$(function(){var a=$('.icon'),b=$('#main');a.click(function(){var d=_asyncToGenerator(regeneratorRuntime.mark(function f(g){var h,i,j,k,l,m,n,o,p,q,r,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R;return regeneratorRuntime.wrap(function(T){for(;;)switch(T.prev=T.next){case 0:T.prev=0,h=$(g.target).attr('data-nodeId'),i=$(g.target).attr('data-deviceType'),j=$(g.target).position(),k=j.top,l=j.left,m=$('<div class="modal" data-forNodeId="'+h+'">\n    <div class="modalHeaderArea">\n        <div class="modalHeader"></div>\n        <div class="modalClose">\xD7</div>\n    </div>\n    <div class="modalBody">\n        <div class="area infoArea"></div>\n        <div class="area formArea"></div>\n    </div>\n    <div class="modalFooter">\n        <div class="btnArea">\n            <button class="btn confirmBtn" data-forNodeId="'+h+'">\u786E\u5B9A</button>\n            <button class="btn cancelBtn">\u53D6\u6D88</button>\n        </div>\n    </div>\n</div>'),n=m.find('.modalHeader'),o=m.find('.modalBody'),p=m.find('.infoArea'),q=m.find('.formArea'),r=DEVICE,t=r.PARAMETERS,u=PARAMETERS_TYPE,v=u.DATA,w=u.CONTROL,x=u.SWITCH,y=t[i],z=getOriginalId(h),n.text(z),T.t0=regeneratorRuntime.keys(y);case 15:if((T.t1=T.t0()).done){T.next=34;break}if(A=T.t1.value,!y.hasOwnProperty(A)){T.next=32;break}B=y[A],C=B.type,D=B.name,A='0'===A.toString()[0]?A.toString():'0'+A,T.t2=C,T.next=T.t2===v?23:T.t2===w?26:T.t2===x?29:32;break;case 23:return E=$('<div class="area">\n <span class="label">'+D+'</span>\n <span data-paraType="data" data-paraId="'+A+'"></span>\n </div>'),p.append(E),T.abrupt('break',32);case 26:return F=$('<label class="control area">'+D+'<input data-paraType="control" data-paraId="'+A+'" type="text"></label>'),q.append(F),T.abrupt('break',32);case 29:return G=$('<div class="radioArea" data-paraType="switch" data-paraId="'+A+'">\n <span class="label">'+D+'</span>\n <label class="radio">\n <input type="radio" value="true" name="'+A+'Radio">\u5F00</label>\n <label class="radio">\n <input type="radio" value="false" name="'+A+'Radio">\u5173</label>\n </div>'),q.append(G),T.abrupt('break',32);case 32:T.next=15;break;case 34:return T.next=36,getNodeInfo(h);case 36:if(H=T.sent,I=H.code,J=H.msg,K=H.data,I!==CODE.SUCCESS){T.next=58;break}for(L in K)K.hasOwnProperty(L)&&(L=L.trim().toUpperCase(),M=o.find('*[data-paraId="'+L+'"]'),0!==M.length&&('div'===M.prop('tagName').toLowerCase()&&'switch'===M.attr('data-paraType')?M.find('input[value='+K[L]+']').prop('checked','true'):'input'===M.prop('tagName').toLowerCase()&&'control'===M.attr('data-paraType')?M.val(K[L]):'span'===M.prop('tagName').toLowerCase()&&'data'===M.attr('data-paraType')&&M.text(K[L])));return T.next=44,getModalMaxPosition();case 44:return N=T.sent,O=N.minLeft,P=N.minTop,Q=N.maxLeft,R=N.maxTop,m.css({display:'none',position:'absolute',left:l<O?O:l>Q?Q:l,top:k<P?P:k>R?R:k}),b.append(m),m.find('.modalClose').click(function(){var U=_asyncToGenerator(regeneratorRuntime.mark(function V(W){return regeneratorRuntime.wrap(function(Y){for(;;)switch(Y.prev=Y.next){case 0:return Y.prev=0,W.preventDefault(),Y.next=4,hideModal(m);case 4:Y.next=9;break;case 6:Y.prev=6,Y.t0=Y['catch'](0),console.log(Y.t0);case 9:case'end':return Y.stop();}},V,void 0,[[0,6]])}));return function(){return U.apply(this,arguments)}}()),m.find('.cancelBtn').click(function(){var U=_asyncToGenerator(regeneratorRuntime.mark(function V(W){return regeneratorRuntime.wrap(function(Y){for(;;)switch(Y.prev=Y.next){case 0:return Y.prev=0,W.preventDefault(),Y.next=4,hideModal(m);case 4:Y.next=9;break;case 6:Y.prev=6,Y.t0=Y['catch'](0),console.log(Y.t0);case 9:case'end':return Y.stop();}},V,void 0,[[0,6]])}));return function(){return U.apply(this,arguments)}}()),m.find('.confirmBtn').click(function(){var U=_asyncToGenerator(regeneratorRuntime.mark(function V(W){var X,Y,Z,_,aa,ba,ca,da,ea,fa,ga,ha,ia,ja,ka,la,ma,na,oa,pa,qa,ra;return regeneratorRuntime.wrap(function(ta){for(;;)switch(ta.prev=ta.next){case 0:for(ta.prev=0,W.preventDefault(),X=m.find('.formArea'),Y=X.find('div[data-paraType=switch]'),Z=X.find('input[data-paraType=control]'),_={id:getOriginalId(h),data:{}},aa=!0,ba=!1,ca=void 0,ta.prev=9,da=Y[Symbol.iterator]();!(aa=(ea=da.next()).done);aa=!0)fa=ea.value,ga=$(fa).find('input[checked=true]'),ha=$(fa).attr('data-paraId'),_.data[ha]='true'===ga.attr('value');ta.next=17;break;case 13:ta.prev=13,ta.t0=ta['catch'](9),ba=!0,ca=ta.t0;case 17:ta.prev=17,ta.prev=18,!aa&&da.return&&da.return();case 20:if(ta.prev=20,!ba){ta.next=23;break}throw ca;case 23:return ta.finish(20);case 24:return ta.finish(17);case 25:for(ia=!0,ja=!1,ka=void 0,ta.prev=28,la=Z[Symbol.iterator]();!(ia=(ma=la.next()).done);ia=!0)na=ma.value,oa=$(na).attr('data-paraId'),_.data[oa]=$(na).val();ta.next=36;break;case 32:ta.prev=32,ta.t1=ta['catch'](28),ja=!0,ka=ta.t1;case 36:ta.prev=36,ta.prev=37,!ia&&la.return&&la.return();case 39:if(ta.prev=39,!ja){ta.next=42;break}throw ka;case 42:return ta.finish(39);case 43:return ta.finish(36);case 44:return ta.next=46,postAsync('/cpn/node/modify',_);case 46:return pa=ta.sent,qa=pa.code,ra=pa.msg,ta.next=51,showNotice(ra.trim(),qa===CODE.SUCCESS);case 51:if(qa!==CODE.SUCCESS){ta.next=54;break}return ta.next=54,hideModal(m);case 54:ta.next=61;break;case 56:return ta.prev=56,ta.t2=ta['catch'](0),console.log(ta.t2),ta.next=61,showNotice('\u8BBE\u5907\u4FE1\u606F\u4FEE\u6539\u5931\u8D25').catch(function(ua){console.log(ua)});case 61:case'end':return ta.stop();}},V,void 0,[[0,56],[9,13,17,25],[18,,20,24],[28,32,36,44],[37,,39,43]])}));return function(){return U.apply(this,arguments)}}()),T.next=56,fadeInAsync(m,150);case 56:T.next=60;break;case 58:return T.next=60,showNotice(J.trim());case 60:T.next=67;break;case 62:return T.prev=62,T.t3=T['catch'](0),console.log(T.t3),T.next=67,showNotice('\u8BBE\u5907\u4FE1\u606F\u83B7\u53D6\u5931\u8D25').catch(function(U){console.log(U)});case 67:case'end':return T.stop();}},f,void 0,[[0,62]])}));return function(){return d.apply(this,arguments)}}())});