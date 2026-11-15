import"./preload-0z9B2t4D.js";var e={x:0,y:1,inDir:2,outDir:3,next0:4,next1:5,speed:6,group:7},t=4294967295,n=[[1,0],[0,1],[-1,0],[0,-1]],r={trunk:0,branchA:1,branchB:2},i=65536,a={slow:2048,fast:4096,express:6144};function o(e,t){let r=Math.sign(t[0]-e[0]),i=Math.sign(t[1]-e[1]),a=n.findIndex(([e,t])=>e===r&&t===i);if(a<0||Math.abs(t[0]-e[0])+Math.abs(t[1]-e[1])!==1)throw Error(`tiles ${e.join(`,`)} and ${t.join(`,`)} are not neighbors`);return a}function s(e){let t=[e[0]];for(let n=1;n<e.length;n++){let[r,i]=t[t.length-1],[a,o]=e[n];if(r!==a&&i!==o)throw Error(`waypoints must be axis aligned`);let s=Math.abs(a-r)+Math.abs(o-i),c=Math.sign(a-r),l=Math.sign(o-i);for(let e=1;e<=s;e++)t.push([r+c*e,i+l*e])}return t}function c(t=56,n=32){if(t<40||n<24)throw Error(`the network needs at least 40 x 24 tiles`);let i=n-6,c=n-3,l=t-3,u=t-6,d=[];for(let e=7;e<=i-2;e+=3)d.push(e);d.length%2==1&&d.pop();let f=[[4,4],[4,d[0]]];d.forEach((e,t)=>{t>0&&f.push([t%2==1?u:6,e]),f.push([t%2==0?u:6,e])}),f.push([6,i],[2,i]);let p=[{tiles:s([[2,i-1],[2,4],[3,4]]),entry:3,exit:0,speed:a.express,group:r.trunk},{tiles:s([[4,4],[l,4],[l,c],[2,c],[2,i]]),entry:0,exit:3,speed:a.fast,group:r.branchA},{tiles:s(f),entry:0,exit:3,speed:a.slow,group:r.branchB}],m=[],h=0;for(let e of p)m.push(h),h+=e.tiles.length;let[g,_,v]=[0,1,2].map(e=>({first:m[e],last:m[e]+p[e].tiles.length-1})),y=new Uint32Array(h*8);p.forEach((t,n)=>{t.tiles.forEach((r,i)=>{let a=(m[n]+i)*8,s=t.tiles[i-1],c=t.tiles[i+1];y[a+e.x]=r[0],y[a+e.y]=r[1],y[a+e.inDir]=s?o(s,r):t.entry,y[a+e.outDir]=c?o(r,c):t.exit,y[a+e.next0]=m[n]+i+1,y[a+e.next1]=m[n]+i+1,y[a+e.speed]=t.speed,y[a+e.group]=t.group})});let b=(t,n,r=n)=>{y[t*8+e.next0]=n,y[t*8+e.next1]=r};b(g.last,_.first,v.first),b(_.last,g.first),b(v.last,g.first);let x=1/0,S=1/0,C=0,w=0;for(let t=0;t<y.length;t+=8)x=Math.min(x,y[t+e.x]),S=Math.min(S,y[t+e.y]),C=Math.max(C,y[t+e.x]),w=Math.max(w,y[t+e.y]);for(let t=0;t<y.length;t+=8)y[t+e.x]-=x-1,y[t+e.y]-=S-1;return{segments:y,count:h,width:C-x+3,height:w-S+3}}function l(e,t,n){return e.segments[t*8+n]}var u=.5;function d(e){return{x:e.width/2,y:e.height/2,zoom:1}}function f(e,t){return{x:Math.min(Math.max(t.x,0),e.width),y:Math.min(Math.max(t.y,0),e.height),zoom:Math.min(Math.max(t.zoom,u),32)}}function p(e,t,n){let r=Math.max(1,n.height-n.top);return Math.min(n.width/e.width,r/e.height)*t.zoom}function m(e,t,n,r,i){let a=p(e,t,n),o=Math.max(1,n.height-n.top);return[n.width/2+(r-t.x)*a,n.top+o/2+(i-t.y)*a]}function h(e,t,n,r,i){let a=p(e,t,n),o=Math.max(1,n.height-n.top);return[t.x+(r-n.width/2)/a,t.y+(i-n.top-o/2)/a]}function g(e,t,n){let r=p(e,t,n),[i,a]=m(e,t,n,0,0),o=Math.min(3,Math.max(.75,r/24));return{scale:[2*r/n.width,-2*r/n.height],offset:[2*i/n.width-1,1-2*a/n.height],half:[2*o/n.width,2*o/n.height]}}function _(e,t,n,r,i,a){let[o,s]=h(e,t,n,r,i),c=Math.min(Math.max(t.zoom*a,u),32),l=p(e,{...t,zoom:c},n),d=Math.max(1,n.height-n.top);return f(e,{x:o-(r-n.width/2)/l,y:s-(i-n.top-d/2)/l,zoom:c})}function v(e,t,n,r,i){let a=p(e,t,n);return f(e,{x:t.x-r/a,y:t.y-i/a,zoom:t.zoom})}function y(t){for(let n=0;n<t.count;n++)if(l(t,n,e.next0)!==l(t,n,e.next1))return n;return-1}function b(t){let r=Math.max(0,y(t)),[i,a]=n[l(t,r,e.outDir)];return[l(t,r,e.x)+.5+i*.5,l(t,r,e.y)+.5+a]}var x={wide:.14,zoomIn:.34,close:.6,zoomOut:.78,wideAgain:.87},S=e=>{let t=Math.min(Math.max(e,0),1);return t*t*(3-2*t)};function C(e,t,n){let r=S(n),i=Math.exp(Math.log(e.zoom)+(Math.log(t.zoom)-Math.log(e.zoom))*r),a=e.zoom===t.zoom?1-r:(1/i-1/t.zoom)/(1/e.zoom-1/t.zoom);return{x:t.x+(e.x-t.x)*a,y:t.y+(e.y-t.y)*a,zoom:i}}function w(t){let r=Math.max(0,y(t)),[i,a]=n[l(t,r,e.outDir)];return[l(t,r,e.x)+2*i,l(t,r,e.y)+2*a]}function ee(e,t){let[n,r]=w(e),i=x.close-x.zoomIn;return[.2,.55,.8].map(e=>({tick:Math.round(t*(x.zoomIn+i*e)),x:n,y:r}))}function te(e,t,n,r){let i=n>0?t/n:0,a=d(e),[o,s]=b(e),c={x:o+3,y:s+1.5,zoom:6},l=ee(e,n),u=Math.max(4,Math.round(n*.02)),f=l.find(e=>t>=e.tick&&t<e.tick+u),p=f?{x:f.x,y:f.y}:null;return i<x.wide?{camera:a,caption:`${r} items on ${String(e.count)} belt segments, all on the GPU`,endCard:!1,click:p}:i<x.zoomIn?{camera:C(a,c,(i-x.wide)/(x.zoomIn-x.wide)),caption:`Into the splitter`,endCard:!1,click:p}:i<x.close?{camera:c,caption:l[0]&&t<l[0].tick?`The splitter: each item takes one output by a hash of its index and the tick`:`Click a belt to rotate it: the network buffer is rewritten on the GPU, the items keep going`,endCard:!1,click:p}:i<x.zoomOut?{camera:C(c,a,(i-x.close)/(x.zoomOut-x.close)),caption:`And back out`,endCard:!1,click:p}:{camera:a,caption:i<x.wideAgain?`${r} items, stepped and drawn every frame`:``,endCard:i>=x.wideAgain,click:p}}var ne=class{data;capacity;width;height;count;constructor(e,t=256){this.capacity=e.count+t,this.data=new Uint32Array(this.capacity*8),this.data.set(e.segments.subarray(0,e.count*8)),this.count=e.count,this.width=e.width,this.height=e.height}get segments(){return this.data.subarray(0,this.count*8)}get(e,t){return this.data[e*8+t]}set(e,t,n){this.data[e*8+t]=n}segmentsAt(t,n){let r=[];for(let i=0;i<this.count;i++)this.get(i,e.x)===t&&this.get(i,e.y)===n&&r.push(i);return r}successor(t){let r=this.get(t,e.outDir),[i,a]=n[r],o=this.get(t,e.x)+i,s=this.get(t,e.y)+a;return this.segmentsAt(o,s).find(t=>this.get(t,e.inDir)===r)??4294967295}link(t,n){this.set(t,e.next0,n),this.set(t,e.next1,n)}edit(t,i){if(!Number.isInteger(t)||!Number.isInteger(i))return{kind:`refused`,reason:`not a tile`,changed:[]};if(t<0||i<0||t>=this.width||i>=this.height)return{kind:`refused`,reason:`outside the grid`,changed:[]};let o=this.segmentsAt(t,i);if(o.length>1)return{kind:`refused`,reason:`a splitter output or merge tile`,changed:[]};if(o.length===1){let t=o[0];if(this.get(t,e.next0)!==this.get(t,e.next1))return{kind:`refused`,reason:`the splitter`,changed:[]};let n=this.get(t,e.inDir),r=(this.get(t,e.outDir)-n+4)%4,i=r===0?1:r===1?3:0;return this.set(t,e.outDir,(n+i)%4),this.link(t,this.successor(t)),{kind:`rotated`,segment:t,changed:[t]}}if(this.count>=this.capacity)return{kind:`refused`,reason:`no free segment slots`,changed:[]};let s=[];for(let r=0;r<this.count;r++){let[a,o]=n[this.get(r,e.outDir)];this.get(r,e.x)+a===t&&this.get(r,e.y)+o===i&&s.push(r)}let c=s.find(t=>this.get(t,e.next0)===4294967295)??s[0],l=c===void 0?0:this.get(c,e.outDir),u=this.count++;this.set(u,e.x,t),this.set(u,e.y,i),this.set(u,e.inDir,l),this.set(u,e.outDir,l),this.set(u,e.speed,c===void 0?a.fast:this.get(c,e.speed)),this.set(u,e.group,c===void 0?r.branchA:this.get(c,e.group)),this.link(u,this.successor(u));let d=[u];for(let t of s)this.get(t,e.outDir)===l&&this.get(t,e.next0)===4294967295&&(this.link(t,u),d.push(t));return{kind:`placed`,segment:u,changed:d}}},T={groups:0,types:3,checksum:7};function re(e,t){let n=new Uint32Array(e),r=new Uint32Array(e),a=new Uint32Array(e),o=Math.ceil(e/t.count),s=i*5/8;for(let i=0;i<e;i++){let e=i%t.count,c=Math.floor(i/t.count);n[i]=e,r[i]=Math.floor(c*s/o),a[i]=Math.floor(e*4/t.count)}return{belt:n,progress:r,itemType:a}}var E=`
struct Segment {
  x: u32,
  y: u32,
  inDir: u32,
  outDir: u32,
  next0: u32,
  next1: u32,
  speed: u32,
  group: u32,
}

const SEGMENT_LENGTH: u32 = ${String(i)}u;
const NO_SEGMENT: u32 = ${String(t)}u;

// lowbias32, the same as mix32 in sim.ts.
fn mix32(v: u32) -> u32 {
  var x = v;
  x ^= x >> 16u;
  x *= 0x7feb352du;
  x ^= x >> 15u;
  x *= 0x846ca68bu;
  x ^= x >> 16u;
  return x;
}
`,D=`
${E}
override ITEMS: u32;

// x: the tick being stepped. One 256-byte slot per step of a batch (dynamic offset).
@group(0) @binding(0) var<uniform> params: vec4u;
@group(0) @binding(1) var<storage, read> segments: array<Segment>;
@group(0) @binding(2) var<storage, read> beltIn: array<u32>;
@group(0) @binding(3) var<storage, read> progressIn: array<u32>;
@group(0) @binding(4) var<storage, read_write> beltOut: array<u32>;
@group(0) @binding(5) var<storage, read_write> progressOut: array<u32>;

@compute @workgroup_size(256)
fn step(@builtin(global_invocation_id) gid: vec3u) {
  let i = gid.x;
  if (i >= ITEMS) {
    return;
  }
  var b = beltIn[i];
  let s = segments[b];
  var p = progressIn[i] + s.speed;
  if (p >= SEGMENT_LENGTH) {
    let output = mix32(i ^ mix32(params.x)) & 1u;
    let next = select(s.next0, s.next1, output == 1u);
    if (next == NO_SEGMENT) {
      // A dead end (an edited belt that leads nowhere): the item waits at the end.
      p = SEGMENT_LENGTH - 1u;
    } else {
      p -= SEGMENT_LENGTH;
      b = next;
    }
  }
  beltOut[i] = b;
  progressOut[i] = p;
}
`,O=`
${E}
override ITEMS: u32;

@group(0) @binding(0) var<storage, read> segments: array<Segment>;
@group(0) @binding(1) var<storage, read> belt: array<u32>;
@group(0) @binding(2) var<storage, read> progress: array<u32>;
@group(0) @binding(3) var<storage, read> itemType: array<u32>;
@group(0) @binding(4) var<storage, read_write> counters: array<atomic<u32>, 8>;

@compute @workgroup_size(256)
fn count(@builtin(global_invocation_id) gid: vec3u) {
  let i = gid.x;
  if (i >= ITEMS) {
    return;
  }
  let b = belt[i];
  atomicAdd(&counters[${String(T.groups)}u + segments[b].group], 1u);
  atomicAdd(&counters[${String(T.types)}u + itemType[i]], 1u);
  atomicAdd(&counters[${String(T.checksum)}u], mix32(i ^ mix32(b ^ mix32(progress[i]))));
}
`,k=`
// Tile coordinates to clip space: clip = tile * scale + offset. half: an item's half size in clip space.
struct View {
  scale: vec2f,
  offset: vec2f,
  half: vec2f,
  pad: vec2f,
}

@group(0) @binding(0) var<uniform> view: View;
@group(0) @binding(1) var<storage, read> segments: array<Segment>;

// Quad corner v (0..3, strip order) in [-1, 1]. Arithmetic rather than lookup tables:
// software rasterizers (SwiftShader) run function-local arrays far slower.
fn corner(v: u32) -> vec2f {
  return vec2f(f32(v & 1u), f32(v >> 1u)) * 2.0 - 1.0;
}

// DIRS in network.ts: east, south, west, north.
fn dir(d: u32) -> vec2f {
  return vec2f(f32(d == 0u) - f32(d == 2u), f32(d == 1u) - f32(d == 3u));
}
`,A=`
struct VertexOut {
  @builtin(position) position: vec4f,
  @location(0) color: vec3f,
}

@fragment
fn fragmentMain(input: VertexOut) -> @location(0) vec4f {
  return vec4f(input.color, 1.0);
}
`,j=`
${E}
${k}

struct BeltOut {
  @builtin(position) position: vec4f,
  @location(0) color: vec3f,
  // The point in the tile's own frame: x along the exit direction, y across, both in [-0.5, 0.5].
  @location(1) local: vec2f,
  @location(2) @interpolate(flat) deadEnd: u32,
}

@vertex
fn vertexMain(@builtin(vertex_index) v: u32, @builtin(instance_index) s: u32) -> BeltOut {
  let seg = segments[s];
  let center = vec2f(f32(seg.x), f32(seg.y)) + vec2f(0.5);
  let c = corner(v) * 0.5;
  let p = center + c;
  let along = dir(seg.outDir);
  var out: BeltOut;
  out.position = vec4f(p * view.scale + view.offset, 0.0, 1.0);
  out.local = vec2f(dot(c, along), dot(c, vec2f(-along.y, along.x)));
  out.deadEnd = u32(seg.next0 == NO_SEGMENT);
  // By path: trunk, branch A, branch B.
  out.color = select(
    select(vec3f(0.27, 0.25, 0.17), vec3f(0.30, 0.20, 0.20), seg.group == 1u),
    vec3f(0.20, 0.24, 0.32),
    seg.group == 0u,
  );
  return out;
}

@fragment
fn fragmentMain(input: BeltOut) -> @location(0) vec4f {
  var color = input.color;
  if (input.deadEnd == 1u) {
    color = vec3f(0.42, 0.14, 0.14);
  }
  let across = abs(input.local.y);
  // Chevrons: three per tile, pointing along the exit direction.
  let k = fract((input.local.x + across * 0.8) * 3.0);
  if (across > 0.4) {
    color *= 0.55;
  } else if (k < 0.22) {
    color *= 1.3;
  }
  return vec4f(color, 1.0);
}
`,M=`
${E}
${k}
${A}

override ITEMS: u32;
override QUADS: u32 = 1u;

@group(0) @binding(2) var<storage, read> belt: array<u32>;
@group(0) @binding(3) var<storage, read> progress: array<u32>;
@group(0) @binding(4) var<storage, read> itemType: array<u32>;

@vertex
fn vertexMain(@builtin(vertex_index) vertex: u32, @builtin(instance_index) instance: u32) -> VertexOut {
  var out: VertexOut;
  let i = instance * QUADS + vertex / 6u;
  if (i >= ITEMS) {
    // Past the last item in the last instance: a degenerate triangle outside the view.
    out.position = vec4f(2.0, 2.0, 0.0, 1.0);
    out.color = vec3f(0.0);
    return out;
  }
  // Triangle-list vertex 0..5 to strip corner 0, 1, 2, 2, 1, 3.
  let k = vertex % 6u;
  let v = select(select(select(3u, 1u, k == 4u), 2u, k == 3u), k, k < 3u);
  let seg = segments[belt[i]];
  let f = f32(progress[i]) / f32(SEGMENT_LENGTH);
  let din = dir(seg.inDir);
  let dout = dir(seg.outDir);
  let entry = vec2f(f32(seg.x), f32(seg.y)) + vec2f(0.5) - 0.5 * din;
  var pos: vec2f;
  var tangent: vec2f;
  if (seg.inDir == seg.outDir) {
    pos = entry + din * f;
    tangent = din;
  } else {
    let a = f * 1.5707964;
    let pivot = entry + 0.5 * dout;
    pos = pivot + 0.5 * (din * sin(a) - dout * cos(a));
    tangent = din * cos(a) + dout * sin(a);
  }
  // Spread items across the belt's width by a per-item hash.
  let h = mix32(i);
  let lateral = (f32(h >> 8u) / 16777216.0 - 0.5) * 0.72;
  pos += vec2f(-tangent.y, tangent.x) * lateral;

  let t = itemType[i];
  let color = select(
    select(vec3f(0.55, 0.90, 0.45), vec3f(0.95, 0.40, 0.45), t == 2u),
    select(vec3f(0.35, 0.80, 0.95), vec3f(0.95, 0.75, 0.25), t == 0u),
    t < 2u,
  );
  let shade = 0.8 + 0.2 * f32(h & 255u) / 255.0;
  out.position = vec4f(pos * view.scale + view.offset + corner(v) * view.half, 0.0, 1.0);
  out.color = color * shade;
  return out;
}
`,N={MAP_READ:1,COPY_SRC:4,COPY_DST:8,UNIFORM:64,STORAGE:128,QUERY_RESOLVE:512},P={VERTEX:1,FRAGMENT:2,COMPUTE:4},F=1,I=4;function ie(e){return Math.min(Math.floor(e.maxStorageBufferBindingSize/I),Math.floor(e.maxBufferSize/I),e.maxComputeWorkgroupsPerDimension*256)}function L(e,t,n){return{binding:e,visibility:t,buffer:{type:n?`read-only-storage`:`storage`}}}var ae=class{tick=0;items;device;segmentBuffer;belt;progress;itemType;stepUniforms;viewUniform;counters;countersRead;countersPending=!1;timestamps;current=0;stepPipeline;countPipeline;beltPipeline;itemPipeline;stepGroups;countGroups;itemGroups;beltGroup;segmentCount;quadsPerInstance;segmentCapacity;constructor(e,t,n,r,i=64,a=n.count){this.device=e,this.items=r.belt.length,this.segmentCount=n.count;let o=this.items,s=(t,n,r)=>e.createBuffer({label:t,size:Math.max(16,n),usage:r}),c=(t,n,r)=>{let i=s(t,n.byteLength,r|N.COPY_DST);return e.queue.writeBuffer(i,0,n),i},l=N.STORAGE|N.COPY_SRC;this.segmentCapacity=Math.max(a,n.count),this.segmentBuffer=s(`segments`,this.segmentCapacity*8*4,N.STORAGE|N.COPY_SRC|N.COPY_DST),e.queue.writeBuffer(this.segmentBuffer,0,n.segments),this.belt=[c(`belt 0`,r.belt,l),s(`belt 1`,o*I,l)],this.progress=[c(`progress 0`,r.progress,l),s(`progress 1`,o*I,l)],this.itemType=c(`item type`,r.itemType,l),this.stepUniforms=s(`step uniforms`,16384,N.UNIFORM|N.COPY_DST),this.viewUniform=s(`view`,32,N.UNIFORM|N.COPY_DST),this.counters=s(`counters`,32,N.STORAGE|N.COPY_SRC|N.COPY_DST),this.countersRead=s(`counters read`,32,N.MAP_READ|N.COPY_DST),this.timestamps=e.features.has(`timestamp-query`)?{set:e.createQuerySet({label:`step timestamps`,type:`timestamp`,count:2}),resolve:s(`timestamps`,16,N.QUERY_RESOLVE|N.COPY_SRC),read:s(`timestamps read`,16,N.MAP_READ|N.COPY_DST),pending:!1}:null;let u=P.COMPUTE,d=P.VERTEX,f=e.createBindGroupLayout({label:`step`,entries:[{binding:0,visibility:u,buffer:{type:`uniform`,hasDynamicOffset:!0,minBindingSize:16}},L(1,u,!0),L(2,u,!0),L(3,u,!0),L(4,u,!1),L(5,u,!1)]}),p=e.createBindGroupLayout({label:`count`,entries:[L(0,u,!0),L(1,u,!0),L(2,u,!0),L(3,u,!0),L(4,u,!1)]}),m={binding:0,visibility:d,buffer:{type:`uniform`}},h=e.createBindGroupLayout({label:`belts`,entries:[m,L(1,d,!0)]}),g=e.createBindGroupLayout({label:`items`,entries:[m,L(1,d,!0),L(2,d,!0),L(3,d,!0),L(4,d,!0)]}),_={ITEMS:o};this.stepPipeline=e.createComputePipeline({label:`step`,layout:e.createPipelineLayout({bindGroupLayouts:[f]}),compute:{module:e.createShaderModule({code:D}),entryPoint:`step`,constants:_}}),this.countPipeline=e.createComputePipeline({label:`count`,layout:e.createPipelineLayout({bindGroupLayouts:[p]}),compute:{module:e.createShaderModule({code:O}),entryPoint:`count`,constants:_}});let v=(n,r,i,a,o={})=>{let s=e.createShaderModule({label:n,code:r});return e.createRenderPipeline({label:n,layout:e.createPipelineLayout({bindGroupLayouts:[i]}),vertex:{module:s,entryPoint:`vertexMain`,constants:o},fragment:{module:s,entryPoint:`fragmentMain`,targets:[{format:t}]},primitive:{topology:a}})};this.beltPipeline=v(`belts`,j,h,`triangle-strip`),this.itemPipeline=v(`items`,M,g,`triangle-list`,{ITEMS:o,QUADS:i}),this.quadsPerInstance=i;let y=(t,n,r)=>e.createBindGroup({layout:t,entries:n.map((e,t)=>t===0&&r!==void 0?{binding:t,resource:{buffer:e,size:r}}:{binding:t,resource:{buffer:e}})}),b=e=>[e(0),e(1)];this.stepGroups=b(e=>y(f,[this.stepUniforms,this.segmentBuffer,this.belt[e],this.progress[e],this.belt[1-e],this.progress[1-e]],16)),this.countGroups=b(e=>y(p,[this.segmentBuffer,this.belt[e],this.progress[e],this.itemType,this.counters])),this.itemGroups=b(e=>y(g,[this.viewUniform,this.segmentBuffer,this.belt[e],this.progress[e],this.itemType])),this.beltGroup=y(h,[this.viewUniform,this.segmentBuffer])}get workgroups(){return Math.ceil(this.items/256)}get hasTimestamps(){return this.timestamps!==null}step(e,t=!1){let n=t&&this.timestamps&&!this.timestamps.pending?this.timestamps:null,r=performance.now(),i=0;for(let t=0;t<e;){let r=Math.min(64,e-t),a=new Uint32Array(r*256/4);for(let e=0;e<r;e++)a[e*256/4]=this.tick+e;this.device.queue.writeBuffer(this.stepUniforms,0,a);let o=this.device.createCommandEncoder({label:`step`});for(let t=0;t<r;t++,i++){let r=i===0,a=i===e-1,s=o.beginComputePass(n&&(r||a)?{timestampWrites:{querySet:n.set,...r&&{beginningOfPassWriteIndex:0},...a&&{endOfPassWriteIndex:1}}}:{});s.setPipeline(this.stepPipeline),s.setBindGroup(0,this.stepGroups[this.current],[t*256]),s.dispatchWorkgroups(this.workgroups),s.end(),this.current=1-this.current}n&&t+r===e&&(o.resolveQuerySet(n.set,0,2,n.resolve,0),o.copyBufferToBuffer(n.resolve,0,n.read,0,16)),this.device.queue.submit([o.finish()]),this.tick+=r,t+=r}return!t||e===0?Promise.resolve(null):n?(n.pending=!0,n.read.mapAsync(F).then(()=>{let[t,r]=new BigUint64Array(n.read.getMappedRange().slice(0));return n.read.unmap(),n.pending=!1,{steps:e,msPerStep:Number(r-t)/1e6/e,source:`gpu timestamps`}},()=>(n.pending=!1,null))):t&&this.timestamps?Promise.resolve(null):this.device.queue.onSubmittedWorkDone().then(()=>({steps:e,msPerStep:(performance.now()-r)/e,source:`wall clock`}),()=>null)}updateSegments(e,t){if(e.count>this.segmentCapacity)throw Error(`more segments than the buffer holds`);for(let n of t){if(n<0||n>=e.count)throw Error(`no segment ${String(n)}`);this.device.queue.writeBuffer(this.segmentBuffer,n*8*4,e.segments,n*8,8)}this.segmentCount=e.count}async readSegments(){let e=this.segmentCount*8*4,t=this.device.createBuffer({size:Math.max(16,e),usage:N.MAP_READ|N.COPY_DST}),n=this.device.createCommandEncoder({label:`read segments`});n.copyBufferToBuffer(this.segmentBuffer,0,t,0,e),this.device.queue.submit([n.finish()]),await t.mapAsync(F);let r=new Uint32Array(t.getMappedRange(0,e).slice(0));return t.destroy(),r}render(e,t){this.device.queue.writeBuffer(this.viewUniform,0,new Float32Array([...t.scale,...t.offset,...t.half,0,0]));let n=this.device.createCommandEncoder({label:`render`}),r=n.beginRenderPass({colorAttachments:[{view:e,clearValue:{r:.067,g:.078,b:.094,a:1},loadOp:`clear`,storeOp:`store`}]});r.setPipeline(this.beltPipeline),r.setBindGroup(0,this.beltGroup),r.draw(4,this.segmentCount),r.setPipeline(this.itemPipeline),r.setBindGroup(0,this.itemGroups[this.current]);let i=this.quadsPerInstance;r.draw(6*i,Math.ceil(this.items/i)),r.end(),this.device.queue.submit([n.finish()])}readCounters(){if(this.countersPending)return null;this.countersPending=!0;let e=this.tick,t=this.device.createCommandEncoder({label:`count`});t.clearBuffer(this.counters);let n=t.beginComputePass();return n.setPipeline(this.countPipeline),n.setBindGroup(0,this.countGroups[this.current]),n.dispatchWorkgroups(this.workgroups),n.end(),t.copyBufferToBuffer(this.counters,0,this.countersRead,0,32),this.device.queue.submit([t.finish()]),this.countersRead.mapAsync(F).then(()=>{let t=new Uint32Array(this.countersRead.getMappedRange().slice(0));return this.countersRead.unmap(),this.countersPending=!1,{tick:e,counters:t}},e=>{throw this.countersPending=!1,e})}async readItems(){let e=this.items*I,t=t=>({src:t,dst:this.device.createBuffer({size:Math.max(16,e),usage:N.MAP_READ|N.COPY_DST})}),n=this.current,r=[t(this.belt[n]),t(this.progress[n]),t(this.itemType)],i=this.device.createCommandEncoder({label:`read items`});for(let t of r)i.copyBufferToBuffer(t.src,0,t.dst,0,e);this.device.queue.submit([i.finish()]);let[a,o,s]=await Promise.all(r.map(async({dst:t})=>{await t.mapAsync(F);let n=new Uint32Array(t.getMappedRange(0,e).slice(0));return t.destroy(),n}));return{belt:a,progress:o,itemType:s}}},oe=60,se=4,ce=500,le=1e6,ue=1440,de=4,R=document.getElementById(`hud`),z=document.getElementById(`gpu-message`),B=document.getElementById(`gpu-canvas`),fe=document.getElementById(`caption`),pe=document.getElementById(`end-card`),me=document.getElementById(`click-mark`),V={state:`starting`,error:null,adapter:``,items:0,segments:0,frames:0,tick:()=>0,step:()=>Promise.reject(Error(`not started`)),timedStep:()=>Promise.reject(Error(`not started`)),read:()=>Promise.reject(Error(`not started`)),counters:()=>Promise.reject(Error(`not started`)),edit:()=>({kind:`refused`,reason:`not started`,changed:[]}),network:()=>({count:0,segments:[]}),readSegments:()=>Promise.reject(Error(`not started`)),camera:()=>({x:0,y:0,zoom:1}),setCamera:()=>{},tileToClient:()=>[0,0]};window.__gpuDemo=V;function H(e){V.state=`failed`,V.error=e,z.textContent=e,z.hidden=!1,R.hidden=!0}function U(e,t,n){let r=e.get(t);if(r===null)return n;let i=Number(r.replace(/_/g,``));return Number.isSafeInteger(i)&&i>0?i:n}function W(e){return e.toLocaleString(`en-US`)}function he(e,t){return e.isFallbackAdapter===!0||/swiftshader|llvmpipe|lavapipe|warp|software/i.test(t)}async function G(){let e=new URLSearchParams(location.search),t=e.get(`capture`)===`1`,n=t||e.get(`paused`)===`1`,r=e.get(`timing`)!==`0`,i=t&&e.get(`camera`)===`film`,a=U(e,`filmticks`,ue);if(!(`gpu`in navigator)||!navigator.gpu){H(`WebGPU is not available in this browser. This demo needs a browser with WebGPU (a recent Chrome, Edge or Safari, or Firefox with WebGPU enabled) on a secure page (https or localhost).`);return}let o=await navigator.gpu.requestAdapter({powerPreference:`high-performance`});if(!o){H(`WebGPU is available, but no GPU adapter was found (it may be blocklisted or disabled).`);return}let s=o.info;V.adapter=[s.vendor,s.architecture,s.description].filter(Boolean).join(` / `);let l=he(s,V.adapter),u=l?`${V.adapter||`unknown`} (software: WebGPU on the CPU, not a GPU)`:V.adapter||`unknown`,p=o.features.has(`timestamp-query`),y=await o.requestDevice({...p&&{requiredFeatures:[`timestamp-query`]},requiredLimits:{maxStorageBufferBindingSize:o.limits.maxStorageBufferBindingSize,maxBufferSize:o.limits.maxBufferSize}});y.lost.then(e=>{e.reason!==`destroyed`&&H(`The GPU device was lost: ${e.message}`)}),y.addEventListener(`uncapturederror`,e=>{H(`WebGPU error: ${e.error.message}`)});let b=U(e,`n`,le),x=Math.min(U(e,`quads`,64),1024),S=ie(y.limits),C=Math.min(b,S),w=new ne(c()),E=re(C,w),D=B.getContext(`webgpu`);if(!D){H(`Could not get a WebGPU canvas context.`);return}let O=navigator.gpu.getPreferredCanvasFormat();D.configure({device:y,format:O,alphaMode:`opaque`}),y.pushErrorScope(`validation`);let k=new ae(y,O,w,E,x,w.capacity),A=await y.popErrorScope();if(A){H(`Could not set up the GPU pipelines: ${A.message}`);return}V.items=C,V.segments=w.count,V.tick=()=>k.tick,V.step=async e=>{k.step(e),await y.queue.onSubmittedWorkDone()},V.timedStep=async e=>(await y.queue.onSubmittedWorkDone(),k.step(e,!0)),V.read=async()=>{let e=await k.readItems();return{belt:Array.from(e.belt),progress:Array.from(e.progress),itemType:Array.from(e.itemType)}},V.counters=async()=>{for(;;){let e=k.readCounters();if(e){let{tick:t,counters:n}=await e;return{tick:t,counters:Array.from(n)}}await new Promise(e=>setTimeout(e,20))}};let j=d(w),M=``,N=(e,t)=>{let n=w.edit(e,t);n.changed.length>0&&k.updateSegments(w,n.changed);let r=`(${String(e)}, ${String(t)})`;return M=n.kind===`refused`?`can't edit ${r}: ${n.reason}`:`${n.kind} belt at ${r}, tick ${W(k.tick)}`,n};V.edit=N,V.network=()=>({count:w.count,segments:Array.from(w.segments)}),V.readSegments=async()=>Array.from(await k.readSegments()),V.camera=()=>j,V.setCamera=e=>{i||(j=f(w,e))};let P=C<b?` (capped from ${W(b)} by the device's limits)`:``,F=null,I=0,L=-1/0,z=performance.now(),G=0,K=z,q=0,J=0,ge=0,_e=0,Y=null,ve=!1,ye=0,be=()=>{let e=Math.min(window.devicePixelRatio||1,2),t=Math.max(1,Math.round(B.clientWidth*e)),n=Math.max(1,Math.round(B.clientHeight*e));(B.width!==t||B.height!==n)&&(B.width=t,B.height=n)},xe=e=>e===`gpu timestamps`?`GPU timestamps`:`wall clock`,Se=xe(k.hasTimestamps?`gpu timestamps`:`wall clock`),Ce=()=>{if(!r)return`hidden (timing=0), timed by ${Se}`;if(!Y)return`measuring (${Se})...`;let e=Y.msPerStep;return`${e.toFixed(e<10?3:1)} (${xe(Y.source)}, over ${W(Y.steps)} ticks)`},X=()=>{let e=[`Beltworks GPU demo: ${W(C)} items${P} on ${String(w.count)} belt segments`,`adapter: ${u}`,t?`tick ${W(k.tick)}, capture mode: ${W(ye)} ticks for this frame`:`tick ${W(k.tick)}${n?` (paused)`:``}, ${ge.toFixed(0)} ticks/s, ${_e.toFixed(1)} fps`,`simulation ms/step: ${Ce()}`,`view ${j.zoom.toFixed(1)}x`+(M?`, last edit: ${M}`:i||t?``:`: drag to pan, wheel to zoom, click to place or rotate a belt`)];if(F){let t=[`trunk`,`branch A`,`branch B`].slice(0,3);e.push(`at tick ${W(I)}: `+t.map((e,t)=>`${e} ${W(F[T.groups+t])}`).join(`, `),`types: ${Array.from({length:4},(e,t)=>W(F[T.types+t])).join(` / `)}, checksum ${F[T.checksum].toString(16).padStart(8,`0`)}`)}R.textContent=e.join(`
`)},Z=()=>B.width/Math.max(1,B.clientWidth),Q=()=>({width:B.width,height:B.height,top:(R.getBoundingClientRect().bottom+8)*Z()});V.tileToClient=(e,t)=>{let[n,r]=m(w,j,Q(),e,t),i=B.getBoundingClientRect();return[i.left+n/Z(),i.top+r/Z()]};let $=()=>{be(),k.render(D.getCurrentTexture().createView(),g(w,j,Q())),V.frames++},we=e=>{if(fe.textContent=e.caption,fe.hidden=e.caption===``,pe.hidden=!e.endCard,me.hidden=e.click===null,e.click){let t=Q(),[n,r]=m(w,j,t,e.click.x,e.click.y),[i,a]=m(w,j,t,e.click.x+1,e.click.y+1),o=Z();Object.assign(me.style,{left:`${String(n/o)}px`,top:`${String(r/o)}px`,width:`${String((i-n)/o)}px`,height:`${String((a-r)/o)}px`})}};if(i){document.getElementById(`end-adapter`).textContent=u,document.getElementById(`end-items`).textContent=`${W(C)} items on ${String(w.count)} belt segments`;let e=document.getElementById(`end-software`);e.hidden=!l,e.textContent=`Recorded on ${/swiftshader/i.test(V.adapter)?`SwiftShader`:`a software adapter`}: WebGPU running on the CPU, not a GPU. Captured frame by frame, not in real time: live, this machine draws ${W(C)} items far below 60 frames per second.`}let Te=()=>{if(!i)return;let e=te(w,k.tick,a,W(C));j=e.camera,we(e)};if(!i){let e=null;B.addEventListener(`pointerdown`,t=>{t.button===0&&(e={id:t.pointerId,x:t.clientX,y:t.clientY,dragged:!1},B.setPointerCapture(t.pointerId))}),B.addEventListener(`pointermove`,t=>{if(!e||e.id!==t.pointerId)return;let n=t.clientX-e.x,r=t.clientY-e.y;!e.dragged&&Math.hypot(n,r)<de||(e.dragged=!0,j=v(w,j,Q(),n*Z(),r*Z()),e.x=t.clientX,e.y=t.clientY)}),B.addEventListener(`pointerup`,t=>{if(!e||e.id!==t.pointerId)return;let n=!e.dragged;if(e=null,!n)return;let r=B.getBoundingClientRect(),[i,a]=h(w,j,Q(),(t.clientX-r.left)*Z(),(t.clientY-r.top)*Z());N(Math.floor(i),Math.floor(a)),X()}),B.addEventListener(`pointercancel`,()=>{e=null}),B.addEventListener(`wheel`,e=>{e.preventDefault();let t=B.getBoundingClientRect(),n=e.deltaMode===1?40:e.deltaMode===2?800:1;j=_(w,j,Q(),(e.clientX-t.left)*Z(),(e.clientY-t.top)*Z(),Math.exp(-e.deltaY*n*.0015))},{passive:!1}),window.addEventListener(`keydown`,e=>{let t=Q(),n=60*Z(),r=e=>_(w,j,t,t.width/2,t.top+(t.height-t.top)/2,e),i={ArrowLeft:()=>v(w,j,t,n,0),ArrowRight:()=>v(w,j,t,-n,0),ArrowUp:()=>v(w,j,t,0,n),ArrowDown:()=>v(w,j,t,0,-n),"+":()=>r(1.25),"=":()=>r(1.25),"-":()=>r(.8),0:()=>d(w)}[e.key];i&&(e.preventDefault(),j=i())})}if(t){let e=async()=>{let e=await V.counters();F=Uint32Array.from(e.counters),I=e.tick},t=i?ee(w,a):[],n=0,r=!1;await e(),Te(),X(),$(),await y.queue.onSubmittedWorkDone(),window.__step=async i=>{if(!Number.isSafeInteger(i)||i<0)throw Error(`__step: bad tick count ${String(i)}`);if(r)throw Error(`__step: the previous step has not finished`);if(V.state===`failed`)throw Error(V.error??`failed`);r=!0;try{let r=k.tick+i,a=null;for(;;){for(;n<t.length&&t[n].tick<=k.tick;)N(t[n].x,t[n].y),n++;if(k.tick>=r)break;let e=n<t.length?Math.min(r,t[n].tick):r;await y.queue.onSubmittedWorkDone(),a=await k.step(e-k.tick,!0)??a}return a&&(Y=a),ye=i,await e(),Te(),X(),$(),await y.queue.onSubmittedWorkDone(),{tick:k.tick,frames:V.frames,timing:a,camera:j}}finally{r=!1}},V.state===`starting`&&(V.state=`running`);return}let Ee=-1/0,De=e=>{if(V.state===`failed`)return;G+=Math.min(e-z,250),z=e;let t=1e3/oe,r=Math.floor(G/t);if(G-=r*t,r>se&&(r=se,G=0),!n&&r>0){let t=!ve&&e-Ee>=ce,n=k.step(r,t);t&&(ve=!0,Ee=e,n.then(e=>{ve=!1,e&&(Y=e)})),q+=r}if($(),J++,V.state===`starting`&&(V.state=`running`),e-L>=ce){let t=k.readCounters();t&&(L=e,t.then(e=>{F=e.counters,I=e.tick}))}e-K>=1e3&&(ge=q*1e3/(e-K),_e=J*1e3/(e-K),K=e,q=0,J=0),X(),requestAnimationFrame(De)};requestAnimationFrame(De)}G().catch(e=>{H(`The demo failed to start: ${e instanceof Error?e.message:String(e)}`)});