const Api = (() => {
  const cfg = () => window.TH_CONFIG || {};
  const normalizeArray = (value) => Array.isArray(value) ? value : [];

  async function fetchFromSheets() {
    const url = (cfg().SHEETS_API_URL || '').trim();
    if (!url) return { data: window.TH_SAMPLE_DATA, demo: true };
    const separator = url.includes('?') ? '&' : '?';
    const fullUrl = `${url}${separator}rota=tudo&cache=${Date.now()}`;
    const response = await fetch(fullUrl, { method: 'GET', mode: 'cors' });
    if (!response.ok) throw new Error(`Erro ao carregar planilha: ${response.status}`);
    const json = await response.json();
    if (json.error) throw new Error(json.error);
    return { data: sanitize(json), demo: false };
  }

  function sanitize(raw) {
    return {
      clientes: normalizeArray(raw.clientes).map((x, i) => ({ id: x.id || `CLI${String(i+1).padStart(3,'0')}`, ...x })),
      emprestimos: normalizeArray(raw.emprestimos).map((x, i) => ({ id: x.id || `EMP${String(i+1).padStart(3,'0')}`, ...x, valor: money(x.valor), jurosPercentual: num(x.jurosPercentual || x.juros || x.taxaJuros), parcelas: num(x.parcelas), multaAtraso: num(x.multaAtraso), jurosDiario: num(x.jurosDiario) })),
      pagamentos: normalizeArray(raw.pagamentos).map(x => ({ ...x, valor: money(x.valor) })),
      despesas: normalizeArray(raw.despesas).map(x => ({ ...x, valor: money(x.valor) })),
      cartoes: normalizeArray(raw.cartoes).map(x => ({ ...x, limite: money(x.limite), comprasMes: money(x.comprasMes || x.compras || x.faturaAtual) }))
    };
  }

  function money(v){ if(typeof v === 'number') return v; return Number(String(v || 0).replace(/\./g,'').replace(',', '.').replace(/[^0-9.-]/g,'')) || 0; }
  function num(v){ return Number(String(v || 0).replace(',', '.')) || 0; }

  return { fetchFromSheets, money, num };
})();
