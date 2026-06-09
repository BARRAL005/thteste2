const Charts = (() => {
  function line(canvas, seriesA, seriesB) {
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr; canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d'); ctx.scale(dpr, dpr);
    const w = rect.width, h = rect.height, pad = 30;
    ctx.clearRect(0,0,w,h);
    ctx.strokeStyle = 'rgba(214,167,51,.14)'; ctx.lineWidth = 1;
    for(let i=0;i<5;i++){ const y=pad + i*(h-pad*2)/4; ctx.beginPath(); ctx.moveTo(pad,y); ctx.lineTo(w-pad,y); ctx.stroke(); }
    const max = Math.max(1, ...seriesA, ...seriesB) * 1.15;
    drawSeries(ctx, seriesA, w, h, pad, max, '#42d66b');
    drawSeries(ctx, seriesB, w, h, pad, max, '#ff4d42');
    ctx.fillStyle = getCss('--muted'); ctx.font = '11px Arial';
    ctx.fillText('01', pad, h-8); ctx.fillText('15', w/2-8, h-8); ctx.fillText('30', w-pad-12, h-8);
  }
  function drawSeries(ctx, data, w, h, pad, max, color){
    ctx.beginPath();
    data.forEach((v,i)=>{ const x=pad+i*((w-pad*2)/(data.length-1)); const y=h-pad-(v/max)*(h-pad*2); i?ctx.lineTo(x,y):ctx.moveTo(x,y); });
    ctx.strokeStyle=color; ctx.lineWidth=3; ctx.stroke();
    const grad=ctx.createLinearGradient(0,pad,0,h-pad); grad.addColorStop(0,color+'55'); grad.addColorStop(1,color+'00');
    ctx.lineTo(w-pad,h-pad); ctx.lineTo(pad,h-pad); ctx.closePath(); ctx.fillStyle=grad; ctx.fill();
  }
  function getCss(name){ return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }
  return { line };
})();
