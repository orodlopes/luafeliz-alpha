document.addEventListener('DOMContentLoaded', () => {
  const gridContainer = document.getElementById('product-grid');
  const searchInput = document.getElementById('search-input');
  const searchDropdown = document.getElementById('search-dropdown');
  const searchContainer = document.getElementById('search-container');
  const categoryContainer = document.getElementById('category-filters');
  
  let allSections = [];
  let allProducts = [];
  let currentCategory = 'Todos';
  let searchTerm = '';

  // Função para formatar moeda
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Função para calcular o desconto
  const calculateDiscount = (oldPrice, currentPrice) => {
    if (!oldPrice || oldPrice <= currentPrice) return 0;
    return Math.round(((oldPrice - currentPrice) / oldPrice) * 100);
  };

  // Função para gerar as estrelas
  const generateStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHtml = '';
    
    for (let i = 0; i < fullStars; i++) {
      starsHtml += `<svg class="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
    }
    if (hasHalfStar) {
      starsHtml += `<svg class="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 fill-current opacity-50" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
    }
    return starsHtml;
  };

  // Função para renderizar um card de produto
  const renderProductCard = (product) => {
    const discount = calculateDiscount(product.preco_antigo, product.preco_atual);
    
    // Lógica de Simulação de Gatilhos Mentais
    const triggerType = Math.floor(Math.random() * 2);
    let triggerHtml = '';
    
    if (triggerType === 0) {
      const leftCount = Math.floor(Math.random() * (8 - 2 + 1)) + 2;
      triggerHtml = `
        <div class="mt-1 mb-3">
          <div class="flex items-center gap-1 text-[10px] sm:text-xs font-bold text-[#EE4D2D] mb-1">
            <span>🔥</span>
            <span>Só mais ${leftCount} disponíveis</span>
          </div>
          <div class="w-full bg-slate-100 rounded-full h-1.5 sm:h-2">
            <div class="bg-[#EE4D2D] h-1.5 sm:h-2 rounded-full" style="width: 90%"></div>
          </div>
        </div>
      `;
    } else {
      const soldCount = Math.floor(Math.random() * (2500 - 1000 + 1)) + 1000;
      triggerHtml = `
        <div class="mt-1 mb-3">
          <div class="flex items-center gap-1 text-[10px] sm:text-xs font-bold text-[#EE4D2D] mb-1">
            <span>👥</span>
            <span>Popular: ${soldCount} vendidos</span>
          </div>
          <div class="w-full bg-slate-100 rounded-full h-1.5 sm:h-2">
            <div class="bg-[#EE4D2D] h-1.5 sm:h-2 rounded-full" style="width: 60%"></div>
          </div>
        </div>
      `;
    }
    
    return `
      <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col h-full border border-slate-100 group">
        <div class="relative overflow-hidden aspect-square sm:aspect-auto sm:h-56">
          <img src="${product.imagem_url}" alt="${product.titulo_curadoria}" class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" loading="lazy" />
          ${discount > 0 ? `<div class="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#EE4D2D] text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded shadow-sm">-${discount}%</div>` : ''}
        </div>
        
        <div class="p-3 sm:p-5 flex flex-col flex-grow">
          <h2 class="text-sm sm:text-lg font-bold text-slate-800 leading-tight mb-1 line-clamp-2">${product.titulo_curadoria}</h2>
          <p class="hidden sm:block text-sm text-slate-500 mb-2 line-clamp-2">${product.copy_venda}</p>
          
          <div class="flex items-center mb-2">
            <span class="text-xs sm:text-sm text-slate-600 font-semibold bg-slate-100 px-2 py-0.5 rounded-full">🛍️ ${product.prova_social_vendas}</span>
          </div>
          
          ${triggerHtml}
          
          <div class="mt-auto pt-2 sm:pt-4 border-t border-slate-100">
            <div class="flex flex-col mb-3 sm:mb-4">
              ${product.preco_antigo > product.preco_atual ? `<span class="text-[10px] sm:text-xs text-slate-400 line-through">De ${formatCurrency(product.preco_antigo)}</span>` : '<span class="text-[10px] sm:text-xs text-transparent">N/A</span>'}
              <span class="text-lg sm:text-2xl font-extrabold text-slate-800">Por ${formatCurrency(product.preco_atual)}</span>
            </div>
            
            <a href="${product.link_afiliado}" target="_blank" rel="noopener noreferrer" class="block w-full text-center bg-[#EE4D2D] hover:opacity-90 text-white text-sm sm:text-base font-bold py-2 sm:py-3.5 px-2 sm:px-4 rounded-lg sm:rounded-xl transition-colors duration-200 shadow-sm">
              Ver Oferta
            </a>
            
            <p class="hidden sm:flex text-[10px] text-center text-slate-400 mt-3 items-center justify-center gap-1">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Verificado em ${product.data_atualizacao}
            </p>
          </div>
        </div>
      </div>
    `;
  };

  const renderEmptyState = () => {
    gridContainer.innerHTML = `
      <div class="col-span-full text-center py-16 bg-white rounded-xl border border-slate-100 shadow-sm w-full">
        <svg class="w-12 h-12 text-slate-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        <p class="text-slate-500 font-medium text-lg">Nenhum produto encontrado.</p>
        <p class="text-sm text-slate-400 mt-1">Tente buscar por outros termos ou limpar os filtros.</p>
        <button id="btn-limpar-busca" class="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors">Limpar Busca</button>
      </div>
    `;
    
    const btnLimpar = document.getElementById('btn-limpar-busca');
    if (btnLimpar) {
      btnLimpar.addEventListener('click', () => {
        if(searchInput) searchInput.value = '';
        searchTerm = '';
        currentCategory = 'Todos';
        atualizarFiltrosVisuais();
        renderizarVitrines();
      });
    }
  };

  const renderizarVitrines = () => {
    gridContainer.innerHTML = '';
    
    // Se há busca, renderiza um grid plano com os resultados
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase().trim();
      const filtrados = allProducts.filter(p => 
        (p.titulo_curadoria && p.titulo_curadoria.toLowerCase().includes(term)) || 
        (p.titulo_limpo && p.titulo_limpo.toLowerCase().includes(term)) ||
        (p.copy_venda && p.copy_venda.toLowerCase().includes(term))
      );
      
      if (filtrados.length === 0) {
        renderEmptyState();
        return;
      }
      
      gridContainer.innerHTML = `
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-slate-800 mb-6">Resultados da Busca</h2>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            ${filtrados.map(renderProductCard).join('')}
          </div>
        </div>
      `;
      return;
    }

    // Se não há busca, renderiza as seções
    let secoesParaRenderizar = allSections;
    
    if (currentCategory !== 'Todos') {
      secoesParaRenderizar = allSections.filter(s => s.titulo_secao === currentCategory);
    }
    
    if (secoesParaRenderizar.length === 0) {
      renderEmptyState();
      return;
    }

    const html = secoesParaRenderizar.map(secao => {
      if (!secao.produtos || secao.produtos.length === 0) return '';
      return `
        <section class="mb-10 sm:mb-14">
          <h2 class="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6 flex items-center gap-2">
            <span class="w-1.5 h-6 bg-[#EE4D2D] rounded-full inline-block"></span>
            ${secao.titulo_secao}
          </h2>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            ${secao.produtos.map(renderProductCard).join('')}
          </div>
        </section>
      `;
    }).join('');
    
    gridContainer.innerHTML = html || renderEmptyState();
  };

  const setupFiltrosDinamicos = () => {
    if(!categoryContainer) return;
    
    const categorias = ['Todos', ...allSections.map(s => s.titulo_secao).filter(Boolean)];
    
    categoryContainer.innerHTML = categorias.map(cat => `
      <button data-category="${cat}" class="category-btn whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors border ${cat === currentCategory ? 'bg-[#EE4D2D] text-white border-[#EE4D2D]' : 'bg-white text-slate-600 border-slate-200 hover:border-[#EE4D2D] hover:text-[#EE4D2D]'} snap-start">
        ${cat}
      </button>
    `).join('');

    // Adicionar eventos de clique
    const botoes = categoryContainer.querySelectorAll('.category-btn');
    botoes.forEach(btn => {
      btn.addEventListener('click', (e) => {
        currentCategory = e.target.dataset.category;
        
        // Limpar busca ao clicar em categoria
        if (searchTerm !== '') {
          searchTerm = '';
          if (searchInput) searchInput.value = '';
        }
        
        atualizarFiltrosVisuais();
        renderizarVitrines();
        
        if (searchDropdown) searchDropdown.classList.add('hidden');
      });
    });
  };

  const atualizarFiltrosVisuais = () => {
    if(!categoryContainer) return;
    const botoes = categoryContainer.querySelectorAll('.category-btn');
    botoes.forEach(btn => {
      if (btn.dataset.category === currentCategory) {
        btn.className = `category-btn whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors border bg-[#EE4D2D] text-white border-[#EE4D2D] snap-start`;
      } else {
        btn.className = `category-btn whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors border bg-white text-slate-600 border-slate-200 hover:border-[#EE4D2D] hover:text-[#EE4D2D] snap-start`;
      }
    });
  };

  const renderDropdown = () => {
    if (!searchDropdown) return;
    
    if (searchTerm.trim() === '') {
      searchDropdown.classList.add('hidden');
      return;
    }
    
    const term = searchTerm.toLowerCase().trim();
    const filtrados = allProducts.filter(p => 
      (p.titulo_curadoria && p.titulo_curadoria.toLowerCase().includes(term)) || 
      (p.titulo_limpo && p.titulo_limpo.toLowerCase().includes(term)) ||
      (p.copy_venda && p.copy_venda.toLowerCase().includes(term))
    ).slice(0, 5); // Limitar sugestões

    if (filtrados.length === 0) {
      searchDropdown.classList.add('hidden');
      return;
    }

    searchDropdown.innerHTML = filtrados.map(p => `
      <li class="p-3 hover:bg-slate-50 cursor-pointer text-sm text-slate-700 transition-colors flex items-center gap-3" data-id="${p.id}">
        <span class="line-clamp-1">${p.titulo_curadoria}</span>
      </li>
    `).join('');

    searchDropdown.classList.remove('hidden');

    const items = searchDropdown.querySelectorAll('li');
    items.forEach(item => {
      item.addEventListener('click', () => {
        const selectedId = item.getAttribute('data-id');
        const selectedProduct = allProducts.find(p => p.id === selectedId);
        
        if (selectedProduct) {
          searchInput.value = selectedProduct.titulo_curadoria;
          searchTerm = selectedProduct.titulo_curadoria;
          
          renderizarVitrines();
          searchDropdown.classList.add('hidden');
        }
      });
    });
  };

  // Event Listener para a busca
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value;
      
      if (searchTerm.trim() !== '') {
        currentCategory = 'Todos';
        atualizarFiltrosVisuais();
      }
      
      renderizarVitrines();
      renderDropdown();
    });
  }

  // Fechar dropdown ao clicar fora
  document.addEventListener('click', (e) => {
    if (searchDropdown && !searchDropdown.classList.contains('hidden')) {
      if (searchContainer && !searchContainer.contains(e.target)) {
        searchDropdown.classList.add('hidden');
      }
    }
  });

  // Buscar dados e inicializar
  const init = async () => {
    try {
      gridContainer.innerHTML = `
        <div class="col-span-full flex justify-center py-12 w-full">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EE4D2D]"></div>
        </div>
      `;
      
      const response = await fetch('./public/data/catalogo.json');
      
      if (!response.ok) {
        throw new Error('Falha ao carregar o catálogo');
      }
      
      const data = await response.json();
      
      // Normalizar os dados (suporta array de seções ou objeto com chaves de categorias)
      if (Array.isArray(data)) {
        allSections = data;
      } else if (typeof data === 'object' && data !== null) {
        // Se for o formato antigo { "produtos": [...] }, converte para uma seção "Destaques"
        if (data.produtos && Array.isArray(data.produtos)) {
          allSections = [{ titulo_secao: "Destaques", produtos: data.produtos }];
        } else {
          // Se for um objeto com chaves de categorias
          allSections = Object.values(data);
        }
      }
      
      // Extrair todos os produtos para a busca global
      allProducts = allSections.reduce((acc, section) => {
        if (section.produtos && Array.isArray(section.produtos)) {
          return acc.concat(section.produtos);
        }
        return acc;
      }, []);
      
      setupFiltrosDinamicos();
      renderizarVitrines();
      
    } catch (error) {
      console.error('Erro:', error);
      gridContainer.innerHTML = `
        <div class="col-span-full text-center py-12 text-red-600 bg-red-50 rounded-xl border border-red-100 w-full">
          <svg class="w-10 h-10 mx-auto mb-2 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          <p class="font-bold text-lg">Ops! Não foi possível carregar as ofertas.</p>
          <p class="text-sm mt-1 text-red-500">Por favor, verifique sua conexão e tente recarregar a página.</p>
          <button onclick="window.location.reload()" class="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-medium transition-colors">Tentar Novamente</button>
        </div>
      `;
    }
  };

  init();
});
