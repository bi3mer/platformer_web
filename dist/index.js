class K{scenes={};registerScene(t,s){if(this.scenes[t]===void 0)this.scenes[t]=s;else console.error(`Key "${t}" for scene already exists! Scene not added to SceneManager.`)}getScene(t){return this.scenes[t]}}class g{changeScene;onExit(){this.changeScene=void 0,this._onExit()}}var q="main menu",$="game",W="player won",I="transition",X="lost",J="won";var x=720,y=480,v=32,C=15,yt=17,V=20,H=30,St=0.625,Ct=0.9375,k=31,Z=31,_=0.96875,B=0.96875,Et=16,wt=16,Nt=0.5,Rt=0.5,L=25,j=15,P=0.78125,Y=0.46875,E="start",T="end",d="death";var f;(function(c){c[c["LEFT"]=0]="LEFT";c[c["RIGHT"]=1]="RIGHT";c[c["DOWN"]=2]="DOWN";c[c["UP"]=3]="UP";c[c["A"]=4]="A";c[c["D"]=5]="D";c[c["E"]=6]="E";c[c["G"]=7]="G";c[c["H"]=8]="H";c[c["I"]=9]="I";c[c["Q"]=10]="Q";c[c["R"]=11]="R";c[c["S"]=12]="S";c[c["W"]=13]="W";c[c["SPACE"]=14]="SPACE";c[c["ESCAPE"]=15]="ESCAPE";c[c["ENTER"]=16]="ENTER";c[c["SHIFT"]=17]="SHIFT";c[c["INVALID"]=18]="INVALID"})(f||(f={}));class p{static _keys=[];static init(){for(let t=0;t<Object.keys(f).length;++t)p._keys.push(!1);window.addEventListener("keydown",p.onKeyDown),window.addEventListener("keyup",p.onKeyUp)}static isKeyDown(...t){const s=t.length;for(let r=0;r<s;++r)if(p._keys[t[r]])return!0;return!1}static keyStrToKey(t){switch(t){case"Down":case"ArrowDown":return f.DOWN;case"Up":case"ArrowUp":return f.UP;case"Right":case"ArrowRight":return f.RIGHT;case"Left":case"ArrowLeft":return f.LEFT;case" ":case"Space":return f.SPACE;case"Escape":return f.ESCAPE;case"a":case"A":return f.A;case"e":case"E":return f.E;case"s":case"S":return f.S;case"d":case"D":return f.D;case"w":case"W":return f.W;case"r":case"R":return f.R;case"q":case"Q":return f.Q;case"g":case"G":return f.G;case"h":case"H":return f.H;case"i":case"I":return f.I;case"Shift":return f.SHIFT;case"Enter":return f.ENTER;default:return console.warn(`Unhandled key: ${t}.`),f.INVALID}}static onKeyDown(t){const s=p.keyStrToKey(t.key);if(p._keys[s]=!0,s==f.DOWN||s==f.UP||s==f.LEFT||s==f.RIGHT)t.preventDefault();return!1}static onKeyUp(t){return p._keys[p.keyStrToKey(t.key)]=!1,!1}static clear(){for(let t=0;t<p._keys.length;++t)p._keys[t]=!1}}class S{x;y;constructor(t,s){this.x=t,this.y=s}copy(){return new S(this.x,this.y)}zero(){this.x=0,this.y=0}equals(t){return this.x==t.x&&this.y==t.y}add(t){return new S(this.x+t.x,this.y+t.y)}addInPlace(t){this.x+=t.x,this.y+=t.y}subtract(t){return new S(this.x-t.x,this.y-t.y)}subtractInPlace(t){this.x-=t.x,this.y-=t.y}scalarAdd(t){this.x+=t,this.y+=t}scalarSubtract(t){this.x-=t,this.y-=t}scalarMultiply(t){return new S(this.x*t,this.y*t)}scalarMultiplyInPlace(t){this.x*=t,this.y*=t}dot(t){return this.x*t.x+this.y+t.y}magnitude(){return Math.sqrt(this.x*this.x+this.y*this.y)}}var F="rgba(150,150,255,1)";var Qt=Math.floor(x/v)-1;class tt extends g{ctx;transitionScene;fakePlayerPos;sign;constructor(t,s){super();this.ctx=t,this.transitionScene=s,this.fakePlayerPos=new S(10,(C-2)*v),this.sign=1}onEnter(){this.ctx.clearRect(0,0,x,y),this.ctx.fillStyle=F,this.ctx.font="48px Arial",this.ctx.fillText("Recformer",247,100),this.ctx.fillStyle="white",this.ctx.font="30px Arial",this.ctx.fillText("Press 'space' to start",220,y*0.55);const t=this.fakePlayerPos.y+v;this.ctx.strokeStyle="white";for(let s=0;s<25;++s)this.ctx.strokeRect(s*v,t,k,Z);this.ctx.fillStyle=F}update(t){if(p.isKeyDown(f.SPACE))this.transitionScene.targetScene=$,this.changeScene=I;const s=this.fakePlayerPos.x;if(s<1||s>Qt)this.sign*=-1;this.fakePlayerPos.x+=t*this.sign}render(){const t=this.fakePlayerPos.x*v,s=(C-2)*v;this.ctx.clearRect(0,this.fakePlayerPos.y,x,H),this.ctx.fillRect(t,s,V,H)}_onExit(){}}class st{startCol=0;endCol=0;offsetX=0;colsPerScreen=Math.ceil(x/v);update(t){const s=t-this.colsPerScreen/2;this.startCol=Math.max(0,Math.floor(s)),this.endCol=this.startCol+this.colsPerScreen,this.offsetX=-s*v+this.startCol*v}columnToScreen(t){return(t-this.startCol)*v+this.offsetX}rowToScreen(t){return t*v}}function $t(t,s,r,n){const{x:i,y:e}=t,o=i+s.x,l=e+s.y,h=r.x,a=r.y,N=h+n.x,R=a+n.y;return i<N&&o>h&&e<R&&l>a}class m{pos;size;type;dead=!1;velocity=new S(0,0);gravity=new S(0,100);constructor(t,s,r,n,i){this.pos=new S(t,s),this.size=new S(r,n),this.type=i}collision(t){if($t(this.pos,this.size,t.pos,t.size))this.handleCollision(t),t.handleCollision(this)}physicsUpdate(t){this.velocity.addInPlace(this.gravity.scalarMultiply(t)),this.velocity.y=Math.min(this.velocity.y,30),this.pos.addInPlace(this.velocity.scalarMultiply(t))}}var A=0,w=1,M=2,Q=3;var kt=6,zt=8,Ut=0.4;class rt extends m{movingRight=!1;movingLeft=!1;moveMod=0;jumpTime=0;squash=1;stretch=1;coinsCollected=0;maxColumn=0;constructor(t,s){super(t,s,St,Ct,A)}update(t){if(this.pos.y>yt){this.dead=!0,console.log("Player fell...");return}if(this.velocity.x=0,p.isKeyDown(f.D,f.RIGHT))this.movingRight=!0,this.velocity.x=kt,this.moveMod=Math.min(zt,this.moveMod+t);if(p.isKeyDown(f.A,f.LEFT))if(this.movingRight)this.movingRight=!1,this.velocity.x=0;else this.movingLeft=!0,this.velocity.x=-kt,this.moveMod=Math.min(zt,this.moveMod+t);if(this.jumpTime<Ut&&p.isKeyDown(f.SPACE,f.UP)){if(this.jumpTime===0)this.velocity.y=-15;else if(this.jumpTime<0.2)this.velocity.y-=2;this.squash=Math.min(1.03,this.squash+0.01),this.stretch=Math.max(0.97,this.stretch-0.01),this.jumpTime+=t}else if(this.squash!=this.stretch)this.squash+=0.01,this.stretch-=0.01;this.maxColumn=Math.max(this.pos.x,this.maxColumn)}handleCollision(t){switch(t.type){case w:{const s=this.pos.add(this.size.scalarMultiply(0.5)),r=t.pos.add(t.size.scalarMultiply(0.5)),n=s.subtract(r);this.size.add(t.size).scalarMultiply(0.5);const e=Math.abs(Math.atan(n.y/n.x));if(!(e<0.96&&e>0.698)&&Math.abs(n.x/this.size.x)>Math.abs(n.y/this.size.y))if(n.x<0)this.pos.x=t.pos.x-this.size.x;else this.pos.x=t.pos.x+t.size.x;else if(n.y>0)this.pos.y=t.pos.y+t.size.y;else this.pos.y=t.pos.y-this.size.y,this.velocity.y=0,this.jumpTime=0,this.stretch=1.01,this.squash=0.99;break}case M:{++this.coinsCollected;break}case Q:{this.dead=!0,console.log("Ran into an enemy! :/");break}default:{console.warn(`Player unhandled collision type: ${t.type}.`);break}}}render(t,s){t.fillStyle=F;const r=s.columnToScreen(this.pos.x),n=s.rowToScreen(this.pos.y),i=H*this.squash,e=V*this.stretch;if(this.movingRight){let o=new Path2D;o.moveTo(r,n),o.lineTo(r-this.moveMod,n+i),o.lineTo(r+e-this.moveMod,n+i),o.lineTo(r+e,n),o.closePath(),t.fill(o,"evenodd"),this.movingRight=!1}else if(this.movingLeft){let o=new Path2D;o.moveTo(r,n),o.lineTo(r+this.moveMod,n+i),o.lineTo(r+e+this.moveMod,n+i),o.lineTo(r+e,n),o.closePath(),t.fill(o,"evenodd"),this.movingLeft=!1}else t.fillRect(r,n,e,i)}}class nt extends m{constructor(t,s){super(t,s,_,B,w)}update(t){}handleCollision(t){}render(t,s){t.strokeStyle="white",t.strokeRect(s.columnToScreen(this.pos.x),s.rowToScreen(this.pos.y),k,Z)}}class it extends m{minY;maxY;yMod;constructor(t,s){super(t+0.25,s+0.25,Nt,Rt,M);this.gravity.y=0,this.yMod=Math.random()*0.5,this.maxY=s+0.3,this.minY=s+0.15,this.velocity.y=this.yMod}update(t){if(this.pos.y>=this.maxY)this.velocity.y=-this.yMod;else if(this.pos.y<=this.minY)this.velocity.y=this.yMod}handleCollision(t){if(t.type===A)this.dead=!0}render(t,s){t.fillStyle="yellow",t.fillRect(s.columnToScreen(this.pos.x),s.rowToScreen(this.pos.y),Et,wt)}}class ot extends m{maxColumns;constructor(t,s,r){super(t+0.25,s+0.25,P,Y,Q);this.velocity.x=3,this.gravity.y=0,this.maxColumns=r}update(t){if(this.pos.x<0||this.pos.x>this.maxColumns)this.velocity.x*=-1}handleCollision(t){if(t.type===w){const s=this.pos.add(this.size.scalarMultiply(0.5)),r=t.pos.add(t.size.scalarMultiply(0.5)),n=s.subtract(r);if(this.size.add(t.size).scalarMultiply(0.5),Math.abs(n.x/this.size.x)>Math.abs(n.y/this.size.y))if(this.velocity.x*=-1,n.x<0)this.pos.x=t.pos.x-this.size.x;else this.pos.x=t.pos.x+t.size.x}}render(t,s){t.fillStyle="red",t.fillRect(s.columnToScreen(this.pos.x),s.rowToScreen(this.pos.y),L,j)}}class et extends m{constructor(t,s){super(t,s+0.1,Y,P,Q);this.velocity.y=3,this.gravity.y=0,this.pos.x+=0.25}update(t){if(this.pos.y<0||this.pos.y>=C)this.velocity.y*=-1}handleCollision(t){if(t.type===w){const s=this.pos.add(this.size.scalarMultiply(0.5)),r=t.pos.add(t.size.scalarMultiply(0.5)),n=s.subtract(r);if(this.size.add(t.size).scalarMultiply(0.5),Math.abs(n.x/this.size.x)<Math.abs(n.y/this.size.y))if(this.velocity.y*=-1,n.y>0)this.pos.y=t.pos.y+t.size.y;else this.pos.y=t.pos.y-this.size.y}}render(t,s){t.fillStyle="red",t.fillRect(s.columnToScreen(this.pos.x),s.rowToScreen(this.pos.y),j,L)}}class ut{src;tgt;probability;constructor(t,s,r){this.src=t,this.tgt=s,this.probability=r}}class O{name;reward;utility;isTerminal;neighbors;constructor(t,s,r,n,i){this.name=t,this.reward=s,this.utility=r,this.isTerminal=n,this.neighbors=i}}class G{nodes;edges;constructor(){this.nodes={},this.edges={}}getNode(t){return this.nodes[t]}hasNode(t){return t in this.nodes}addNode(t){this.nodes[t.name]=t}addDefaultNode(t,s=1,r=0,n=!1,i=null){if(i==null)i=[];this.nodes[t]=new O(t,s,r,n,i)}removeNode(t){const s=[];for(let r of Object.values(this.edges)){if(r.src==t||r.tgt==t)s.push(r);const n=r.probability;let i=-1;for(let h=0;h<n.length;h++){const[a,N]=n[h];if(a==t){i=h;break}}if(i==-1)continue;const e=n[i][1];n.splice(i,1);const o=n.length,l=e/o;r.probability=n.map(([h,a])=>[h,a+l])}for(let r of s)this.removeEdge(r.src,r.tgt);delete this.nodes[t]}getEdge(t,s){return this.edges[`${t},${s}`]}hasEdge(t,s){return`${t},${s}`in this.edges}addEdge(t){this.edges[`${t.src},${t.tgt}`]=t;const s=this.nodes[t.src].neighbors;if(!s.includes(t.tgt))s.push(t.tgt)}addDefaultEdge(t,s,r=null){if(r==null)r=[[s,1]];this.addEdge(new ut(t,s,r))}removeEdge(t,s){const r=this.nodes[t],n=r.neighbors.indexOf(s);r.neighbors.splice(n,1),delete this.edges[`${t},${s}`]}neighbors(t){return this.nodes[t].neighbors}setNodeUtilities(t){for(let[s,r]of Object.entries(t))this.nodes[s].utility=r}utility(t){return this.nodes[t].utility}reward(t){return this.nodes[t].reward}isTerminal(t){return this.nodes[t].isTerminal}mapNodes(t){for(let s of Object.values(this.nodes))t(s)}mapEdges(t){for(let s of Object.values(this.edges))t(s)}}function z(t){return t[Math.floor(Math.random()*t.length)]}function U(t,s,r,n){const i=t.getEdge(s,r).probability,e=i.length;let o=0;for(let l=0;l<e;++l){const[h,a]=i[l];o+=a*(t.reward(h)+n*t.utility(h))}return o}function D(t,s,r){const n=t.getNode(s);if(n.isTerminal)return 0;const i=n.neighbors,e=i.length;let o=(-Infinity);for(let l=0;l<e;++l)o=Math.max(o,U(t,s,i[l],r));return o}function ft(t){for(let s in t.nodes)t.nodes[s].utility=0}function ct(t){const s={};for(let r in t.nodes)if(!t.getNode(r).isTerminal)s[r]=[...t.neighbors(r)];return s}function lt(t,s){const r={};for(let n in t.nodes){if(t.getNode(n).isTerminal)continue;let i=(-Infinity),e=[];for(let o of t.neighbors(n)){const l=U(t,n,o,s);if(l===i)e.push(o);else if(l>i)i=l,e.length=0,e.push(o)}r[n]=e}return r}var qt=function(t,s,r,n){for(let i=0;i<n;++i)for(let e in t.nodes){const o=t.getNode(e);if(!o.isTerminal)o.utility=U(t,e,z(s[e]),r)}},Ht=function(t,s,r,n){for(let i=0;i<n;++i){const e={};for(let o in t.nodes)if(!t.getNode(o).isTerminal)e[o]=U(t,o,z(s[o]),r);t.setNodeUtilities(e)}},Tt=function(t,s,r,n){for(let i=0;i<n;++i)for(let e in t.nodes)t.getNode(e).utility=D(t,e,r)},Ot=function(t,s,r,n){for(let i=0;i<n;++i){const e={};for(let o in t.nodes)e[o]=D(t,o,r);t.setNodeUtilities(e)}},Ft=function(t,s,r){let n=!1;for(let i in t.nodes){if(t.getNode(i).isTerminal)continue;let e=null,o=(-Infinity);for(let l of t.neighbors(i)){const h=U(t,i,l,r);if(h===o);else if(h>o)e=l,o=h}if(z(s[i])!==e)s[i].length=0,s[i].push(e),n=!0}return n};function ht(t,s,r=!1,n=!1,i=10,e=!0){if(e)ft(t);const o=ct(t);let l;if(r&&n)l=qt;else if(r&&!n)l=Ht;else if(!r&&n)l=Tt;else l=Ot;let h=!0;while(h)l(t,o,s,i),h=Ft(t,o,s);return l(t,o,s,i),Ft(t,o,s),lt(t,s)}class b extends O{visitedCount;sumPercentCompleted;depth;designerReward;playerReward;constructor(t,s,r,n,i,e){super(t,s,r,n,i);this.designerReward=s,this.playerReward=0,this.depth=e,this.visitedCount=1,this.sumPercentCompleted=1}updateReward(){this.reward=this.designerReward*this.visitedCount}}var u=new G;u.addNode(new b(E,0,0,!1,[],-1));u.addNode(new b(d,-1,0,!0,[],-1));u.addNode(new b(T,1,0,!0,[],-1));u.addNode(new b("1-a",-0.8,0,!1,[],1));u.addNode(new b("2-a",-0.7,0,!1,[],2));u.addNode(new b("2-b",-0.7,0,!1,[],2));u.addNode(new b("3-a",-0.6,0,!1,[],3));u.addNode(new b("3-b",-0.6,0,!1,[],3));u.addNode(new b("4-a",-0.3,0,!1,[],4));u.addNode(new b("4-b",-0.3,0,!1,[],4));u.addNode(new b("5-a",-0.2,0,!1,[],5));u.addNode(new b("5-b",-0.2,0,!1,[],5));u.addNode(new b("5-c",-0.2,0,!1,[],5));u.addNode(new b("6-a",-0.1,0,!1,[],6));u.addNode(new b("7-a",-0,0,!1,[],7));u.addNode(new b("6-b",-0.1,0,!1,[],6));u.addDefaultEdge(E,"1-a",[["1-a",0.99],[d,0.01]]);u.addDefaultEdge("1-a","2-a",[["2-a",0.99],[d,0.01]]);u.addDefaultEdge("1-a","2-b",[["2-b",0.99],[d,0.01]]);u.addDefaultEdge("1-a","3-b",[["3-b",0.99],[d,0.01]]);u.addDefaultEdge("2-a","3-b",[["3-b",0.99],[d,0.01]]);u.addDefaultEdge("2-a","3-a",[["3-a",0.99],[d,0.01]]);u.addDefaultEdge("2-b","3-a",[["3-a",0.99],[d,0.01]]);u.addDefaultEdge("3-a","4-a",[["4-a",0.99],[d,0.01]]);u.addDefaultEdge("3-a","4-b",[["4-b",0.99],[d,0.01]]);u.addDefaultEdge("3-b","4-a",[["4-a",0.99],[d,0.01]]);u.addDefaultEdge("3-b","4-b",[["4-b",0.99],[d,0.01]]);u.addDefaultEdge("4-a","5-a",[["5-a",0.99],[d,0.01]]);u.addDefaultEdge("4-a","5-b",[["5-b",0.99],[d,0.01]]);u.addDefaultEdge("4-a","5-c",[["5-c",0.99],[d,0.01]]);u.addDefaultEdge("4-b","5-a",[["5-a",0.99],[d,0.01]]);u.addDefaultEdge("4-b","5-b",[["5-b",0.99],[d,0.01]]);u.addDefaultEdge("5-a","6-a",[["6-a",0.99],[d,0.01]]);u.addDefaultEdge("5-a","6-b",[["6-b",0.99],[d,0.01]]);u.addDefaultEdge("5-b","6-b",[["6-b",0.99],[d,0.01]]);u.addDefaultEdge("5-b","6-a",[["6-a",0.99],[d,0.01]]);u.addDefaultEdge("5-c","6-a",[["6-a",0.99],[d,0.01]]);u.addDefaultEdge("5-c","6-b",[["6-b",0.99],[d,0.01]]);u.addDefaultEdge("6-a","7-a",[["7-a",0.99],[d,0.01]]);u.addDefaultEdge("7-a","end",[["end",0.99],[d,0.01]]);u.addDefaultEdge("6-b","7-a",[["7-a",0.99],[d,0.01]]);var Zt={"1-a":["----------------------","----------------------","----------------------","-----------------X----","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","--------------X-------","-----o-----o--X------o","XXXXXXXXXXXXXXXXX^XXXX"],"2-a":["----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","-------XXXXXXXX-------","----------------------","-------V--o---V-----o-","----------------------","XXXXXXXXXXXXXXXXXXXXXX"],"2-b":["----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","-----------o----------","--------------------o-","-----X---H-----X------","XXXXXXXXXXXXXXXXXXXXXX"],"3-a":["----------------------","----------------------","----------------------","----------------------","-----------o----------","----------------------","---------XXXXX--------","-----------o----------","----------------------","-------X-H-----X------","---XX--XXXXXXXXX--XX--","----------------------","-------V---o---V----o-","----------------------","XXXXXXXXXXXXXXXXXXXXXX"],"3-b":["----------------------","----------------------","----------------------","----------------------","----------o-----------","----------------------","--------XXXXX---------","--------V---V---------","----------o-----------","----------------------","------XXXXXXXXX-------","----------------------","----------o---------o-","-----X---H-----X------","XXXXXXXXXXXXXXXXXXXXXX"],"4-a":["----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------XXX---","-----------------V----","-------X---XX-----V---","------XX------o-V---o-","-----XXX--------------","XXXXXXXX---XXXXXXXXXXX"],"4-b":["--------------------XX","--------------------XX","--------------------XX","--------------------XX","--------------------XX","-----------X-H---o--XX","-----------------o--XX","---------o----------XX","-----------XXXXXXX--XX","--------------------XX","-------X------------XX","------XXX-----------XX","-----XXXXX-----------o","----XXXXXXX-----------","XXXXXXXXXXXXXXXX--XXXX"],"5-a":["--------XXXXXXXXXXXXXX--------","-------------------ooX--------","---------------------X--------","---------------------X--------","------------------XXXX--------","------------------X-----------","-----------o--XXXXX-----------","------------------------------","---------XX-----------------o-","------------------------------","--------------XX---XXX----XXXX","------------------------------","----------XX------------------","------------------------------","XXXXXXXX----------------------"],"5-b":["------------------------------","-o----------------------------","------------------------------","XXX---------------------------","------------------------------","-----XXX----------------------","------------------------------","-----------XXX----------------","-o--------------------------o-","------XXX---------------------","XXX-----------------------XXXX","------------XXX-------XX------","------------------XX----------","------------------------------","XXXXXXXX---XXXXX--------------"],"5-c":["o-----------------------------","------------------------------","X---XX------------------------","------------------------------","------------------------------","XX----------------------------","--------XXXXX-----------------","--------Xoo-------------------","XXX-----Xoo----o------------o-","--------X---------------------","--------XXX---XX----XX----XXXX","XXXX--------------------------","------------------------------","------------------------------","XXXXXXXX----------------------"],"6-a":["----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","-------oo---XXXXXXXX----------","-o----------XXXXXXXX----------","------XXXX--XXXXXXXX----------","--------------o---------------","XXXX--------------------------","-------------XXXX-----------o-","---------------------XX-------","XXXXXXXX-----------------XXXXX"],"7-a":["-------------------V---------------","-----------------o---o-------------","------------X-H------------H--XXX--","-----V------XXXXXXXXXXXXXXXXXXXXX--","--------XX----o--------------------","-----------------------------------","-----------XXXXXX---Ho-------------","-----------------------------------","-------------V------XX--------H----","-----------------------------------","XX--------o------XXXXX----H--------","-----------------------------------","---X----H----H-X-----------------o-","---XXXXXXXXXXXXX-------------------","XXXX--------------------------XXXXX"],end:["----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----oooooooooooooooooo","XXXXXXXXXXXXXXXXXXXXXX"],"6-b":["----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX--o-------","-o--------XXXXXXXXXX----------","----------XXXXXXXXXX--X-------","----------XXXXXXXXXX----------","XXX-------XXXXXXXXXXX---------","------XX-----oooo-----------o-","------------------------------","XXXX--------XXXXXX---XX---XXXX"]};class dt{playerIsOnLastLevel=!1;keys;columnsPerLevel;lossesInARow=0;playerWonLastRound=!1;constructor(){}update(t,s){const r=this.keys.length,n=[];if(t){for(let e=0;e<r;++e)n.push(1);this.lossesInARow=0}else{let e=s;for(let o=0;o<r;++o)if(e>this.columnsPerLevel[o])n[o]=1,e-=this.columnsPerLevel[o];else{n[o]=e/this.columnsPerLevel[o];break}}const i=n.length;for(let e=0;e<i;++e){const o=n[e],l=this.keys[e],h=u.getNode(l);if(o===1){if(!u.hasEdge(E,l))u.addDefaultEdge(E,l,[[l,1],[d,0]])}++h.visitedCount,h.sumPercentCompleted+=o,h.updateReward();const a=h.sumPercentCompleted/h.visitedCount,N=1-a;u.mapEdges((R)=>{if(R.tgt===l)R.probability[0][1]=a,R.probability[1][1]=N})}if(!t){++this.lossesInARow;for(let e=0;e<this.lossesInARow;++e){const o=u.getNode(E).neighbors,l=o.length;if(l===1)break;let h="",a=-1e4;for(let N=0;N<l;++N){const R=o[N],It=u.getNode(R).depth;if(It>a)h=R,a=It}console.log("removing edge:",h,a),u.removeEdge(E,h)}console.log("=======================")}this.playerWonLastRound=t}get(t){const s=ht(u,0.95,!0,!0,20);if(this.columnsPerLevel=[],this.playerWonLastRound)this.keys=[z(s[E])];else this.keys=[E];for(let i=0;i<t;++i){const e=z(s[this.keys[i]]);if(this.keys.push(e),e===T)break}this.keys.splice(0,1),this.playerIsOnLastLevel=this.keys.includes(T);const r=Array(C).fill(""),n=this.keys.length;for(let i=0;i<n;++i){const e=Zt[this.keys[i]];this.columnsPerLevel.push(e[0].length);for(let o=0;o<C;++o)r[o]+=e[o]}return r}}class pt extends m{vertical;color;time=0;constructor(t,s,r){super(t,s,_,B,w);this.vertical=r,this.color="yellow",this.gravity.y=0}update(t){if(this.time+=t,Math.ceil(this.time)%3===0)this.color="red";else this.color="yellow"}handleCollision(t){}render(t,s){t.strokeStyle=this.color;const r=s.columnToScreen(this.pos.x),n=s.rowToScreen(this.pos.y),i=n+Z;t.beginPath(),t.moveTo(r,i),t.lineTo(r+k/2,n),t.lineTo(r+k,i),t.lineTo(r,i),t.stroke(),t.strokeStyle="white",t.beginPath(),t.moveTo(r,n),t.lineTo(r+k,n),t.stroke()}}class bt extends g{ctx;transitionScene;camera;numCoins;levelDirector;staticEntities;dynamicEntities;constructor(t,s){super();this.ctx=t,this.transitionScene=s,this.camera=new st,this.levelDirector=new dt}onEnter(){this.dynamicEntities=[],this.staticEntities=[],this.numCoins=0,this.dynamicEntities.push(new rt(2,12));const t=this.levelDirector.get(2),s=t.length;if(s!==C){console.error("Level should have 15 rows!");return}const r=t[0].length;for(let n=0;n<s;++n){const i=t[n];if(r!==i.length){console.error(`Every row in the level should have the same number of columns! (${r} !== ${i.length}).`);return}for(let e=0;e<r;++e){const o=i[e];if(o==="X")this.staticEntities.push(new nt(e,n));else if(o==="^")this.dynamicEntities.push(new pt(e,n,!0));else if(o==="o")++this.numCoins,this.dynamicEntities.push(new it(e,n));else if(o==="H")this.dynamicEntities.push(new ot(e,n,r));else if(o==="V")this.dynamicEntities.push(new et(e,n));else if(o!=="-")console.error(`Unhandled tile type: ${i[e]}`)}}}update(t){let s=this.dynamicEntities.length,r=0;for(;r<s;++r)if(this.dynamicEntities[r].dead)this.dynamicEntities.splice(r,1),--s,--r;const n=this.staticEntities.length;let i;for(r=0;r<s;++r){const o=this.dynamicEntities[r];o.update(t),o.physicsUpdate(t);for(i=r+1;i<s;++i)o.collision(this.dynamicEntities[i]);for(i=0;i<n;++i)o.collision(this.staticEntities[i])}const e=this.dynamicEntities[0];if(e.coinsCollected>=this.numCoins)if(this.levelDirector.playerIsOnLastLevel)this.transitionScene.targetScene=W,this.changeScene=I;else this.transitionScene.targetScene=J,this.changeScene=I;if(e.dead)this.transitionScene.targetScene=X,this.changeScene=I}render(){this.ctx.clearRect(0,0,x,y),this.camera.update(this.dynamicEntities[0].pos.x);let t=this.staticEntities.length,s=0;for(;s<t;++s)this.staticEntities[s].render(this.ctx,this.camera);t=this.dynamicEntities.length;for(s=0;s<t;++s)this.dynamicEntities[s].render(this.ctx,this.camera)}_onExit(){const t=this.dynamicEntities[0];this.levelDirector.update(!t.dead,Math.floor(t.maxColumn))}}class at extends g{ctx;constructor(t){super();this.ctx=t}onEnter(){this.ctx.clearRect(0,0,x,y),this.ctx.font="30px Arial",this.ctx.fillStyle="white",this.ctx.fillText("You won! Congratulations!",170,y/2)}update(t){}render(){}_onExit(){}}class xt extends g{targetScene=q;timer=0;ctx;constructor(t){super();this.ctx=t}onEnter(){}update(t){if(this.timer+=t,this.timer>0.6)this.changeScene=this.targetScene}render(){const t=this.timer/0.5;this.ctx.fillStyle=`rgba(0,0,0, ${t})`,this.ctx.fillRect(0,0,x,y)}_onExit(){this.timer=0}}class gt extends g{ctx;transitionScene;constructor(t,s){super();this.ctx=t,this.transitionScene=s}onEnter(){p.clear(),this.ctx.fillStyle=F,this.ctx.font="48px Arial",this.ctx.fillText("YOU WON",250,200),this.ctx.fillStyle="white",this.ctx.font="30px Arial",this.ctx.fillText("Press 'space' to keep going.",180,400)}update(t){if(p.isKeyDown(f.SPACE))this.transitionScene.targetScene=$,this.changeScene=I}render(){}_onExit(){}}class vt extends g{ctx;transitionScene;constructor(t,s){super();this.ctx=t,this.transitionScene=s}onEnter(){p.clear(),this.ctx.fillStyle="red",this.ctx.font="48px Arial",this.ctx.fillText("YOU LOST",243,200),this.ctx.fillStyle="white",this.ctx.font="30px Arial",this.ctx.fillText("Press 'space' to try again.",195,400)}update(t){if(p.isKeyDown(f.SPACE))this.transitionScene.targetScene=$,this.changeScene=I}render(){}_onExit(){}}class mt{canvas;ctx;currentScene;sceneManager;constructor(){this.canvas=document.createElement("canvas"),this.canvas.setAttribute("id","canvas"),this.canvas.width=x,this.canvas.height=y,this.ctx=this.canvas.getContext("2d"),document.getElementById("game").appendChild(this.canvas);const t=new xt(this.ctx);this.sceneManager=new K,this.sceneManager.registerScene(q,new tt(this.ctx,t)),this.sceneManager.registerScene($,new bt(this.ctx,t)),this.sceneManager.registerScene(W,new at(this.ctx)),this.sceneManager.registerScene(I,t),this.sceneManager.registerScene(J,new gt(this.ctx,t)),this.sceneManager.registerScene(X,new vt(this.ctx,t)),this.currentScene=this.sceneManager.getScene(q),this.currentScene.onEnter()}start(){let t=0;const s=(r)=>{const n=Math.min(0.05,(r-t)/1000);t=r,this.currentScene.update(n),this.currentScene.render();const i=this.currentScene.changeScene;if(i!==void 0)this.currentScene.onExit(),this.currentScene=this.sceneManager.getScene(i),this.currentScene.onEnter();window.requestAnimationFrame(s)};window.requestAnimationFrame(s)}}window.addEventListener("load",()=>{p.init(),new mt().start()});
