// <daf-castle-hero> — illustrated 3D Neuschwanstein for the hero.
// Intro: ink edges draw in (blueprint) while the camera sweeps around → pastel solids bloom → scene lives (orbit sway, pointer parallax, waving flags, drifting clouds, birds, swaying trees).
/* eslint-disable */
// @ts-nocheck
import * as THREE from "three";

const C = { bg: 0xffffff, ink: 0x14183a, wall: 0xf7f4ee, stone: 0xe2ddd2, gate: 0xe9e2d6, roofSky: 0x5d6f8f, roofCoral: 0x8a95ad, win: 0x2b3358, hill: 0xd5dfc8, ground: 0xe8ecdf, tree: 0x6f8f5e, trunk: 0x6b5a48, mount: 0xc6d2e0, snow: 0xffffff, sun: 0xffd43b, cloud: 0xffffff, flag: [0x46a302, 0x14183a, 0xd9a400] };
const clamp01 = x => Math.max(0, Math.min(1, x));
const easeOut = t => 1 - Math.pow(1 - t, 3);
const easeInOut = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function gable(L, d, h) {
  const s = new THREE.Shape(); s.moveTo(-d / 2, 0); s.lineTo(d / 2, 0); s.lineTo(0, h); s.closePath();
  const g = new THREE.ExtrudeGeometry(s, { depth: L, bevelEnabled: false });
  g.translate(0, 0, -L / 2); g.rotateY(Math.PI / 2); return g;
}

class DafCastle3D extends HTMLElement {
  connectedCallback() {
    if (this._init) return; this._init = true;
    Object.assign(this.style, this.hasAttribute('background') ? { display: 'block', position: 'absolute', inset: '0' } : { display: 'block', width: '100%', height: '100%', position: 'relative' });
    this.reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.bg = this.hasAttribute('background'); this.mobile = matchMedia('(max-width: 720px)').matches; this.scroll = 0;
    let renderer; try { renderer = this.renderer = new THREE.WebGLRenderer({ antialias: !this.mobile || devicePixelRatio < 2, alpha: true, powerPreference: this.bg ? 'low-power' : 'default', preserveDrawingBuffer: true }); } catch (e) { this._init = false; return; }
    renderer.setPixelRatio(Math.min(devicePixelRatio, this.mobile ? 1.5 : 1.75)); renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.domElement.style.cssText = 'width:100%;height:100%;display:block;touch-action:pan-y';
    this.appendChild(renderer.domElement);

    const scene = this.scene = new THREE.Scene();
    scene.background = null; scene.fog = new THREE.Fog(this.bg ? 0xeef4f8 : C.bg, this.bg ? 90 : 30, this.bg ? 180 : 75);
    this.camera = new THREE.PerspectiveCamera(28, 1, 0.1, 200);
    scene.add(new THREE.HemisphereLight(0xffffff, 0xeae3d5, 1.7));
    const sun = new THREE.DirectionalLight(0xfff1d6, 2.3); sun.position.set(-9, 15, 11); sun.castShadow = true;
    sun.shadow.mapSize.set(this.mobile ? 1024 : 2048, this.mobile ? 1024 : 2048); Object.assign(sun.shadow.camera, { left: -11, right: 11, top: 11, bottom: -11, near: 1, far: 50 });
    sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.03; scene.add(sun);

    this.inkLine = new THREE.LineBasicMaterial({ color: C.ink, transparent: true, opacity: 0.55 });
    this.softLine = new THREE.LineBasicMaterial({ color: C.ink, transparent: true, opacity: 0.28 });
    this.parts = []; this.flags = []; this.trees = []; this.clouds = []; this.birds = [];
    this.build();

    this.pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    (this.bg ? window : this).addEventListener('pointermove', this._pm = e => { const r = this.getBoundingClientRect(); this.pointer.tx = ((e.clientX - r.left) / r.width) * 2 - 1; this.pointer.ty = ((e.clientY - r.top) / r.height) * 2 - 1; });
    this.addEventListener('pointerleave', () => { this.pointer.tx = 0; this.pointer.ty = 0; });
    this.ro = new ResizeObserver(() => this.resize()); this.ro.observe(this); requestAnimationFrame(() => this.resize());
    this.visible = true;
    this.io = new IntersectionObserver(es => { this.visible = es[0].isIntersecting; if (this.visible) this.loop(); }); this.io.observe(this);
    this.replay();
  }
  disconnectedCallback() {
    if (this._pm) window.removeEventListener('pointermove', this._pm);
    cancelAnimationFrame(this.raf); this.ro && this.ro.disconnect(); this.io && this.io.disconnect();
    this.scene && this.scene.traverse(o => { o.geometry && o.geometry.dispose(); o.material && o.material.dispose && o.material.dispose(); });
    this.renderer && this.renderer.dispose(); this._init = false; this.innerHTML = '';
  }

  add(parent, geom, color, pos, t, o = {}) {
    const mat = new THREE.MeshStandardMaterial({ color, roughness: o.rough ?? 0.88, metalness: 0, flatShading: o.flat ?? true, transparent: true, opacity: 0, depthWrite: false, side: o.side || THREE.FrontSide, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1, emissive: o.emissive || 0x000000, emissiveIntensity: o.emissive ? (o.emissive === 0xffffff ? 0.32 : 0.5) : 0 });
    const mesh = new THREE.Mesh(geom, mat); mesh.position.set(pos[0], pos[1], pos[2]);
    if (o.rot) mesh.rotation.set(o.rot[0], o.rot[1], o.rot[2]);
    mesh.receiveShadow = o.receive ?? true; mesh.castShadow = false;
    let lines = null, count = 0;
    if (o.edges !== false) {
      const eg = new THREE.EdgesGeometry(geom, o.angle || 28); count = eg.attributes.position.count;
      lines = new THREE.LineSegments(eg, o.soft ? this.softLine : this.inkLine); eg.setDrawRange(0, 0); mesh.add(lines);
    }
    parent.add(mesh);
    this.parts.push({ mesh, mat, lines, count, t, cast: o.cast ?? true, fillAt: o.fillAt });
    return mesh;
  }

  build() {
    const S = this.scene, A = (...a) => this.add(...a);
    const castle = new THREE.Group(); S.add(castle);
    A(S, new THREE.PlaneGeometry(240, 240), C.ground, [0, -2.5, 0], 0, { rot: [-Math.PI / 2, 0, 0], edges: false, cast: false, fillAt: 0.2 });
    const hill = new THREE.CylinderGeometry(1, 1.3, 1.6, 48); hill.scale(8, 1, 4.4);
    A(S, hill, C.hill, [0, -1.7, 0], 0.05, { cast: false });
    const plat = new THREE.CylinderGeometry(1, 1.1, 0.9, 48); plat.scale(6.2, 1, 2.7);
    A(S, plat, C.stone, [0, -0.45, 0], 0.2, { cast: false });
    // mountains
    (this.bg ? [[-20, -32, 7, 9.5], [-9, -36, 8.5, 12], [5, -36, 8, 11], [16, -33, 7.5, 9.5], [26, -29, 6, 7]] : [[-18, -30, 6.5, 6.5], [-8, -34, 8, 8.5], [5, -33, 7, 7.2], [16, -31, 7.5, 6.8], [25, -27, 5.5, 5]]).forEach(([x, z, r, h], i) => {
      A(S, new THREE.ConeGeometry(r, h, 6), C.mount, [x, -2.5 + h / 2, z], 0.1 + i * 0.06, { soft: true, rot: [0, i * 0.7, 0], cast: false, receive: false });
      const ch = h * 0.3; A(S, new THREE.ConeGeometry(r * 0.3 + 0.05, ch, 6), C.snow, [x, -2.5 + h - ch / 2 + 0.03, z], 0.2 + i * 0.06, { edges: false, rot: [0, i * 0.7, 0], cast: false, receive: false });
    });
    if (!this.bg) A(S, new THREE.IcosahedronGeometry(1.7, 2), C.sun, [-17, 9, -24], 0, { edges: false, flat: false, emissive: C.sun, cast: false, receive: false, fillAt: 0.3 });
    [[-7.5, 7.6, -8], [6.5, 8.6, -10], [12, 5.8, -5]].forEach((p, i) => {
      const g = new THREE.Group(); g.position.set(p[0], p[1], p[2]); S.add(g); this.clouds.push({ g, x: p[0], ph: i * 2.1 });
      [[0, 0, 0, 1.1], [1.2, -0.2, 0.1, 0.85], [-1.1, -0.25, 0, 0.8], [0.4, 0.55, -0.1, 0.75]].forEach(c => A(g, new THREE.IcosahedronGeometry(c[3], 1), C.cloud, [c[0], c[1], c[2]], 0.3 + i * 0.1, { edges: false, emissive: 0xffffff, cast: false, receive: false, fillAt: 0.5 + i * 0.15 }));
    });
    // castle
    A(castle, new THREE.BoxGeometry(2.1, 2.1, 1.7), C.gate, [-3.55, 1.05, 0.1], 0.5);
    for (let x = -4.5; x <= -2.6; x += 0.42) { A(castle, new THREE.BoxGeometry(0.22, 0.3, 0.22), C.gate, [x, 2.25, 0.84], 1.3); A(castle, new THREE.BoxGeometry(0.22, 0.3, 0.22), C.gate, [x, 2.25, -0.64], 1.35); }
    A(castle, new THREE.BoxGeometry(0.62, 0.95, 0.05), C.win, [-3.55, 0.47, 0.97], 1.6, { edges: false });
    [-4.6, -2.5].forEach((x, i) => { A(castle, new THREE.CylinderGeometry(0.24, 0.24, 2.7, 20), C.wall, [x, 1.35, 0.95], 0.7 + i * 0.05); A(castle, new THREE.ConeGeometry(0.31, 0.85, 20), C.roofCoral, [x, 3.12, 0.95], 1.2 + i * 0.05); });
    A(castle, new THREE.BoxGeometry(0.5, 1.5, 1.0), C.wall, [-2.3, 0.75, -0.1], 0.6);
    A(castle, new THREE.BoxGeometry(3.2, 3.6, 1.5), C.wall, [0.3, 1.8, 0], 0.6);
    A(castle, gable(3.34, 1.62, 1.35), C.roofSky, [0.3, 3.6, 0], 1.15);
    A(castle, new THREE.CylinderGeometry(0.45, 0.45, 5.2, 24), C.wall, [-1.75, 2.6, 0.35], 0.75);
    A(castle, new THREE.ConeGeometry(0.57, 1.85, 24), C.roofCoral, [-1.75, 6.12, 0.35], 1.35);
    A(castle, new THREE.CylinderGeometry(0.26, 0.26, 6.4, 20), C.wall, [2.05, 3.2, -0.5], 0.85);
    A(castle, new THREE.ConeGeometry(0.33, 1.5, 20), C.roofCoral, [2.05, 7.15, -0.5], 1.45);
    A(castle, new THREE.CylinderGeometry(0.2, 0.2, 1.2, 18), C.wall, [1.75, 3.3, 0.75], 1.0);
    A(castle, new THREE.ConeGeometry(0.26, 0.72, 18), C.roofCoral, [1.75, 4.26, 0.75], 1.4);
    A(castle, new THREE.BoxGeometry(1.8, 2.6, 1.3), C.wall, [3.1, 1.3, 0.1], 0.7);
    A(castle, gable(1.94, 1.42, 1.05), C.roofSky, [3.1, 2.6, 0.1], 1.25);
    A(castle, new THREE.CylinderGeometry(0.3, 0.3, 3.6, 24), C.wall, [4.15, 1.8, 0.5], 0.8);
    A(castle, new THREE.ConeGeometry(0.39, 1.25, 24), C.roofCoral, [4.15, 4.22, 0.5], 1.3);
    A(castle, new THREE.BoxGeometry(1.0, 1.0, 0.9), C.wall, [4.9, 0.5, -0.05], 0.75);
    for (let x = 4.5; x <= 5.35; x += 0.38) A(castle, new THREE.BoxGeometry(0.18, 0.24, 0.18), C.wall, [x, 1.12, 0.33], 1.4);
    // windows (fill only)
    [-1.1, -0.37, 0.37, 1.1].forEach(dx => [1.1, 2.0, 2.9].forEach(y => A(castle, new THREE.BoxGeometry(0.26, 0.46, 0.04), C.win, [0.3 + dx, y, 0.76], 1.8, { edges: false, cast: false })));
    [2.2, 3.3, 4.4].forEach(y => A(castle, new THREE.BoxGeometry(0.16, 0.34, 0.04), C.win, [-1.75, y, 0.82], 1.85, { edges: false, cast: false }));
    [-0.45, 0.45].forEach(dx => [0.9, 1.8].forEach(y => A(castle, new THREE.BoxGeometry(0.26, 0.42, 0.04), C.win, [3.1 + dx, y, 0.77], 1.9, { edges: false, cast: false })));
    [-0.1, 0.45].forEach(z => [1.3, 2.4].forEach(y => A(castle, new THREE.BoxGeometry(0.04, 0.42, 0.24), C.win, [1.91, y, z], 1.9, { edges: false, cast: false })));
    [-0.55, 0.55].forEach(dx => A(castle, new THREE.BoxGeometry(0.2, 0.32, 0.04), C.win, [-3.55 + dx, 1.5, 0.96], 1.9, { edges: false, cast: false }));
    [1.2, 2.3].forEach(y => A(castle, new THREE.BoxGeometry(0.14, 0.3, 0.04), C.win, [4.15, y, 0.81], 1.95, { edges: false, cast: false }));
    // flags
    [[-1.75, 7.05, 0.35], [2.05, 7.9, -0.5], [4.15, 4.85, 0.5]].forEach((p, i) => {
      A(castle, new THREE.CylinderGeometry(0.025, 0.025, 0.7, 6), C.ink, [p[0], p[1] + 0.35, p[2]], 1.6 + i * 0.05, { edges: false, cast: false });
      const g = new THREE.PlaneGeometry(0.55, 0.32, 10, 1); g.translate(0.275, 0, 0);
      const m = A(castle, g, C.flag[i], [p[0] + 0.02, p[1] + 0.52, p[2]], 1.7 + i * 0.05, { edges: false, flat: false, side: THREE.DoubleSide, cast: false });
      this.flags.push({ m, base: g.attributes.position.array.slice(), ph: i });
    });
    // trees
    [[-5.6, 1.8, 1], [-6.6, 0.6, 0.8], [-3.6, 3.0, 0.9], [5.8, 1.6, 1], [6.8, 0.2, 0.85], [3.9, 3.1, 0.8]].forEach(([x, z, s], i) => {
      const g = new THREE.Group(); g.position.set(x, -0.9, z); g.scale.setScalar(s); S.add(g); this.trees.push({ g, ph: i * 1.3 });
      A(g, new THREE.CylinderGeometry(0.08, 0.1, 0.45, 6), C.trunk, [0, 0.22, 0], 1.4 + i * 0.05, { edges: false });
      A(g, new THREE.ConeGeometry(0.55, 1.6, 7), C.tree, [0, 1.2, 0], 1.45 + i * 0.05);
    });
    // birds
    for (let i = 0; i < 3; i++) {
      const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute([-0.32, 0.1, 0, 0, 0, 0, 0.32, 0.1, 0], 3));
      const l = new THREE.Line(g, this.inkLine); l.visible = false; S.add(l); this.birds.push({ l, ph: i * 0.55, r: 7.5 + i * 0.6, h: 6.4 + i * 0.5 });
    }
  }

  resize() {
    const w = this.clientWidth || 1, h = this.clientHeight || 1;
    this.renderer.setSize(w, h, false); this.camera.aspect = w / h; this.camera.updateProjectionMatrix();
    const tan = Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2));
    this.R = this.bg ? Math.max(9.4 / tan, (8.8 / this.camera.aspect) / tan) : Math.max(6.9 / tan, (7.8 / this.camera.aspect) / tan);
    this.shift = this.bg ? h * (this.camera.aspect < 0.9 ? 0.26 : 0.17) : 0;
    if (this.shift) this.camera.setViewOffset(w, h, 0, -this.shift, w, h); else this.camera.clearViewOffset();
    if (!this.raf) this.frame(performance.now());
  }

  replay() {
    this.start = performance.now() - (this.reduce ? 20000 : 0);
    this.parts.forEach(p => { p.mat.transparent = true; p.mat.depthWrite = false; p.mat.opacity = 0; p.mat.needsUpdate = true; p.mesh.castShadow = false; p.done = false; if (p.lines) p.lines.geometry.setDrawRange(0, 0); });
    this.loop();
  }

  loop() { if (this.raf) return; const tick = now => { this.raf = 0; if (!this.visible || !this.isConnected) return; this.frame(now); this.raf = requestAnimationFrame(tick); }; this.raf = requestAnimationFrame(tick); }

  frame(now) {
    if (!this.R) { this.resize(); if (!this.R) return; }
    const t = (now - this.start) / 1000, live = this.reduce ? 0 : now / 1000;
    for (const p of this.parts) {
      if (p.done) continue;
      if (p.lines) { const k = easeOut(clamp01((t - p.t) / 0.95)); p.lines.geometry.setDrawRange(0, Math.floor(p.count * k / 2) * 2); }
      const fs = p.fillAt ?? (2.25 + p.t * 0.38); const f = clamp01((t - fs) / 0.7);
      p.mat.opacity = f;
      if (f >= 1) { p.mat.transparent = false; p.mat.depthWrite = true; p.mat.needsUpdate = true; p.mesh.castShadow = p.cast; if (p.lines) p.lines.geometry.setDrawRange(0, p.count); p.done = true; }
    }
    const P = this.pointer; P.x += (P.tx - P.x) * 0.05; P.y += (P.ty - P.y) * 0.05;
    const k = easeInOut(clamp01(t / 4.4));
    const az = THREE.MathUtils.lerp(-1.15, 0.42, k) + (this.reduce ? 0 : this.scroll * 0.85) + (this.reduce ? 0 : Math.sin(live * 0.16) * 0.14 * k) + P.x * 0.16 * k;
    const sp = this.reduce ? 0 : this.scroll, se = sp * sp * (3 - 2 * sp);
    const el = THREE.MathUtils.lerp(0.72, 0.19, k) - P.y * 0.05 * k + se * 0.22;
    const R = this.R * THREE.MathUtils.lerp(1.3, 1, k) * (1 - se * 0.14), T = new THREE.Vector3(0.25, 2.9, 0);
    this.camera.position.set(T.x + R * Math.sin(az) * Math.cos(el), T.y + R * Math.sin(el), T.z + R * Math.cos(az) * Math.cos(el));
    this.camera.lookAt(T);
    for (const f of this.flags) { const a = f.m.geometry.attributes.position; for (let i = 0; i < a.count; i++) { const x = f.base[i * 3]; a.array[i * 3 + 2] = Math.sin(x * 9 - live * 7 + f.ph) * 0.07 * (x / 0.55); } a.needsUpdate = true; }
    for (const tr of this.trees) tr.g.rotation.z = Math.sin(live * 1.4 + tr.ph) * 0.035;
    for (const c of this.clouds) c.g.position.x = c.x + Math.sin(live * 0.12 + c.ph) * 1.6;
    const bt = t - 3.2;
    for (const b of this.birds) {
      b.l.visible = bt > 0; if (bt <= 0) continue;
      const a = live * 0.28 + b.ph; b.l.position.set(Math.cos(a) * b.r, b.h + Math.sin(live * 0.9 + b.ph) * 0.3, Math.sin(a) * b.r * 0.6);
      b.l.rotation.y = -a; const w = 0.12 * Math.sin(live * 9 + b.ph * 5); const arr = b.l.geometry.attributes.position.array; arr[1] = w; arr[7] = w; b.l.geometry.attributes.position.needsUpdate = true;
    }
    this.renderer.render(this.scene, this.camera);
  }
}
if (!customElements.get('daf-hero-castle')) customElements.define('daf-hero-castle', DafCastle3D);
