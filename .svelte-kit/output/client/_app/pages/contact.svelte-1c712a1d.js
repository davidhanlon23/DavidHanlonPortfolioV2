import{X as be,C as $e,S as W,i as ee,s as te,e as p,t as B,k as w,c as v,a as b,g as F,d as f,n as I,b as o,Y as fe,f as C,F as d,h as ye,Z as de,_ as ke,$ as Ee,a0 as xe,a1 as we,a2 as me,r as Ie,a3 as Ce,w as De,x as S,u as L,M as he,J as Te,a4 as Ve,a5 as _e,a6 as je,j as U,m as X,a7 as M,o as J,D as Y,a8 as qe,v as Z,a9 as Me,aa as Be,ab as ae}from"../chunks/vendor-1fde8790.js";import{u as j}from"../chunks/store-9984b785.js";import{B as Fe}from"../chunks/Button-1519a163.js";import{C as Se}from"../chunks/Container-7e014be9.js";import"../chunks/Icon-edd10b00.js";function Le(u){const t=$e([]);function e(r,c="default",s){t.update(l=>[...l,{id:Ne(),type:c,message:r,timeout:s}])}const a=be(t,(r,c)=>{if(c(r),r.length>0){const s=setTimeout(()=>{t.update(l=>(l.shift(),l))},r[0].timeout);return()=>{clearTimeout(s)}}}),{subscribe:n}=a;return{subscribe:n,send:e,default:(r,c)=>e(r,"default",c),danger:(r,c)=>e(r,"danger",c),warning:(r,c)=>e(r,"warning",c),info:(r,c)=>e(r,"info",c),success:(r,c)=>e(r,"success",c)}}function Ne(){return"_"+Math.random().toString(36).substr(2,9)}const se=Le();function pe(u,t,e){const a=u.slice();return a[2]=t[e],a}function ve(u){let t,e;return{c(){t=p("i"),this.h()},l(a){t=v(a,"I",{class:!0}),b(t).forEach(f),this.h()},h(){o(t,"class",e=""+(de(u[2].icon)+" svelte-qfy9pg"))},m(a,n){C(a,t,n)},p(a,n){n&2&&e!==(e=""+(de(a[2].icon)+" svelte-qfy9pg"))&&o(t,"class",e)},d(a){a&&f(t)}}}function ge(u,t){let e,a,n=t[2].message+"",r,c,s,l,i,g=Te,x,_=t[2].icon&&ve(t);return{key:u,first:null,c(){e=p("div"),a=p("div"),r=B(n),c=w(),_&&_.c(),s=w(),this.h()},l(m){e=v(m,"DIV",{class:!0,style:!0});var $=b(e);a=v($,"DIV",{class:!0});var E=b(a);r=F(E,n),E.forEach(f),c=I($),_&&_.l($),s=I($),$.forEach(f),this.h()},h(){o(a,"class","content svelte-qfy9pg"),o(e,"class","toast svelte-qfy9pg"),fe(e,"background",t[0][t[2].type]),this.first=e},m(m,$){C(m,e,$),d(e,a),d(a,r),d(e,c),_&&_.m(e,null),d(e,s),x=!0},p(m,$){t=m,(!x||$&2)&&n!==(n=t[2].message+"")&&ye(r,n),t[2].icon?_?_.p(t,$):(_=ve(t),_.c(),_.m(e,s)):_&&(_.d(1),_=null),(!x||$&3)&&fe(e,"background",t[0][t[2].type])},r(){i=e.getBoundingClientRect()},f(){ke(e),g(),Ee(e,i)},a(){g(),g=xe(e,i,Ve,{})},i(m){x||(we(()=>{l||(l=me(e,_e,{y:30},!0)),l.run(1)}),x=!0)},o(m){l||(l=me(e,_e,{y:30},!1)),l.run(0),x=!1},d(m){m&&f(e),_&&_.d(),m&&l&&l.end()}}}function Ae(u){let t,e=[],a=new Map,n,r=u[1];const c=s=>s[2].id;for(let s=0;s<r.length;s+=1){let l=pe(u,r,s),i=c(l);a.set(i,e[s]=ge(i,l))}return{c(){t=p("div");for(let s=0;s<e.length;s+=1)e[s].c();this.h()},l(s){t=v(s,"DIV",{class:!0});var l=b(t);for(let i=0;i<e.length;i+=1)e[i].l(l);l.forEach(f),this.h()},h(){o(t,"class","notifications svelte-qfy9pg")},m(s,l){C(s,t,l);for(let i=0;i<e.length;i+=1)e[i].m(t,null);n=!0},p(s,[l]){if(l&3){r=s[1],Ie();for(let i=0;i<e.length;i+=1)e[i].r();e=Ce(e,l,c,1,s,r,a,t,je,ge,null,pe);for(let i=0;i<e.length;i+=1)e[i].a();De()}},i(s){if(!n){for(let l=0;l<r.length;l+=1)S(e[l]);n=!0}},o(s){for(let l=0;l<e.length;l+=1)L(e[l]);n=!1},d(s){s&&f(t);for(let l=0;l<e.length;l+=1)e[l].d()}}}function He(u,t,e){let a;he(u,se,r=>e(1,a=r));let{themes:n={danger:"#E26D69",success:"#84C991",warning:"#f0ad4e",info:"#5bc0de",default:"#aaaaaa"}}=t;return u.$$set=r=>{"themes"in r&&e(0,n=r.themes)},[n,a]}class Pe extends W{constructor(t){super();ee(this,t,He,Ae,te,{themes:0})}}function Oe(u){let t,e,a,n,r,c,s,l,i,g,x,_,m,$,E,D,z,G,k,K,q,T,N,V,A,Q,le;return T=new Fe({props:{classes:"border-2 py-2 px-12 border-dh-secondary-dark-500 text-dh-secondary-dark-500 hover:text-white hover:bg-dh-secondary-dark-500 dark:hover:text-black",text:"Contact",type:"submit"}}),V=new Pe({}),{c(){t=p("form"),e=p("div"),a=p("div"),n=p("label"),r=B("Name"),c=w(),s=p("input"),l=w(),i=p("div"),g=p("label"),x=B("Email"),_=w(),m=p("input"),$=w(),E=p("div"),D=p("label"),z=B("Message"),G=w(),k=p("textarea"),K=w(),q=p("div"),U(T.$$.fragment),N=w(),U(V.$$.fragment),this.h()},l(h){t=v(h,"FORM",{class:!0,id:!0,method:!0,action:!0,enctype:!0});var y=b(t);e=v(y,"DIV",{class:!0});var H=b(e);a=v(H,"DIV",{class:!0});var P=b(a);n=v(P,"LABEL",{for:!0,class:!0});var oe=b(n);r=F(oe,"Name"),oe.forEach(f),c=I(P),s=v(P,"INPUT",{id:!0,name:!0,type:!0,class:!0}),P.forEach(f),l=I(H),i=v(H,"DIV",{class:!0});var O=b(i);g=v(O,"LABEL",{for:!0,class:!0});var ie=b(g);x=F(ie,"Email"),ie.forEach(f),_=I(O),m=v(O,"INPUT",{id:!0,name:!0,type:!0,class:!0}),O.forEach(f),H.forEach(f),$=I(y),E=v(y,"DIV",{class:!0});var R=b(E);D=v(R,"LABEL",{for:!0,class:!0});var ce=b(D);z=F(ce,"Message"),ce.forEach(f),G=I(R),k=v(R,"TEXTAREA",{id:!0,name:!0,type:!0,placeholder:!0,class:!0}),b(k).forEach(f),R.forEach(f),K=I(y),q=v(y,"DIV",{class:!0});var ue=b(q);X(T.$$.fragment,ue),ue.forEach(f),y.forEach(f),N=I(h),X(V.$$.fragment,h),this.h()},h(){o(n,"for","contact-form-name"),o(n,"class",`${ne}`),o(s,"id","contact-form-name"),o(s,"name","name"),o(s,"type","text"),o(s,"class",`${re} h-10 p-4`),s.required=!0,o(a,"class","flex flex-col md:mr-4"),o(g,"for","contact-form-email"),o(g,"class",`${ne}`),o(m,"id","contact-form-email"),o(m,"name","email"),o(m,"type","text"),o(m,"class",`${re} h-10 p-4`),m.required=!0,o(i,"class","flex flex-col"),o(e,"class","flex flex-col md:flex-row mb-8"),o(D,"for","contact-form-message"),o(D,"class",`${ne}`),o(k,"id","contact-form-message"),o(k,"name","message"),o(k,"type","text"),o(k,"placeholder","How can I assist you?"),o(k,"class",`${re} p-4 h-56`),k.required=!0,o(E,"class","flex flex-col"),o(q,"class","mt-8 flex justify-center"),o(t,"class","my-8"),o(t,"id","contact-form"),o(t,"method","POST"),o(t,"action","http://localhost:5001/api/contact"),o(t,"enctype","multipart/form-data")},m(h,y){C(h,t,y),d(t,e),d(e,a),d(a,n),d(n,r),d(a,c),d(a,s),M(s,u[0].name),d(e,l),d(e,i),d(i,g),d(g,x),d(i,_),d(i,m),M(m,u[0].email),d(t,$),d(t,E),d(E,D),d(D,z),d(E,G),d(E,k),M(k,u[0].message),d(t,K),d(t,q),J(T,q,null),C(h,N,y),J(V,h,y),A=!0,Q||(le=[Y(s,"input",u[2]),Y(m,"input",u[3]),Y(k,"input",u[4]),Y(t,"submit",qe(u[5]))],Q=!0)},p(h,[y]){y&1&&s.value!==h[0].name&&M(s,h[0].name),y&1&&m.value!==h[0].email&&M(m,h[0].email),y&1&&M(k,h[0].message)},i(h){A||(S(T.$$.fragment,h),S(V.$$.fragment,h),A=!0)},o(h){L(T.$$.fragment,h),L(V.$$.fragment,h),A=!1},d(h){h&&f(t),Z(T),h&&f(N),Z(V,h),Q=!1,Me(le)}}}const re="border border-gray-200 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-900 text-black dark:text-white text-xl",ne="text-black dark:text-white text-xl font-normal mb-2";function Re(u,t,e){let a;he(u,j,g=>e(0,a=g));function n(){console.log("user",a),Be({method:"POST",url:"http://localhost:5001/api/contact",data:{name:a.name,email:a.email,message:a.message,subject:"Contact Form Email"}}).then(g=>{g.data.status==="success"?(se.success("Message Sent!",3e3),r()):g.data.status==="fail"&&se.danger("Message Failed!",3e3)})}function r(){ae(j,a.name="",a),ae(j,a.email="",a),ae(j,a.message="",a)}function c(){a.name=this.value,j.set(a)}function s(){a.email=this.value,j.set(a)}function l(){a.message=this.value,j.set(a)}return[a,n,c,s,l,g=>n()]}class Ue extends W{constructor(t){super();ee(this,t,Re,Oe,te,{})}}function Xe(u){let t,e,a,n,r,c;return r=new Ue({}),{c(){t=p("h1"),e=B("Thanks for taking the time to reach out. How can I help you today?"),a=w(),n=p("div"),U(r.$$.fragment),this.h()},l(s){t=v(s,"H1",{class:!0});var l=b(t);e=F(l,"Thanks for taking the time to reach out. How can I help you today?"),l.forEach(f),a=I(s),n=v(s,"DIV",{class:!0});var i=b(n);X(r.$$.fragment,i),i.forEach(f),this.h()},h(){o(t,"class","pt-16 text-5xl font-normal text-dh-secondary-dark-500 text-center"),o(n,"class","mt-8 flex justify-center")},m(s,l){C(s,t,l),d(t,e),C(s,a,l),C(s,n,l),J(r,n,null),c=!0},i(s){c||(S(r.$$.fragment,s),c=!0)},o(s){L(r.$$.fragment,s),c=!1},d(s){s&&f(t),s&&f(a),s&&f(n),Z(r)}}}function Je(u){let t,e,a;return e=new Se({props:{className:"",$$slots:{default:[Xe]},$$scope:{ctx:u}}}),{c(){t=p("div"),U(e.$$.fragment),this.h()},l(n){t=v(n,"DIV",{class:!0});var r=b(t);X(e.$$.fragment,r),r.forEach(f),this.h()},h(){o(t,"class","py-16 min-h-screen")},m(n,r){C(n,t,r),J(e,t,null),a=!0},p(n,[r]){const c={};r&1&&(c.$$scope={dirty:r,ctx:n}),e.$set(c)},i(n){a||(S(e.$$.fragment,n),a=!0)},o(n){L(e.$$.fragment,n),a=!1},d(n){n&&f(t),Z(e)}}}class Qe extends W{constructor(t){super();ee(this,t,null,Je,te,{})}}export{Qe as default};
