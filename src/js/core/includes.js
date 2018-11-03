// Importando o jQuery utilizando o sistema de modulos do JS
import $ from 'jquery'

const loadHtmlSuccessCallbakcs = []

// Adiciona no array uma callback para ser chamada quando a página for carregada via AJAX totalmente
export function onLoadHtmlSuccess(callback) {
  if (!loadHtmlSuccessCallbakcs.includes(callback)) {
    loadHtmlSuccessCallbakcs.push(callback)
  }
}

function loadIncludes(parent = 'body') {
  // Procura nos filhos diretos elementos com a propriedade wm-include
  $(parent).find('[wm-include]').each((i, el) => {
    // Pega o valor dela
    const url = $(el).attr('wm-include')
    // Faz uma requisição AJAX e obtém o conteúdo HTML da página especificada dentro do wm-include
    $.ajax({
      url,
      success(data) {
        // Coloca o HTML da página dentro do elemento e remove o wm-include
        $(el).html(data)
        $(el).removeAttr('wm-include')

        // Executa todas as callbacks definidas a cada requisição AJAX
        loadHtmlSuccessCallbakcs.forEach(callback => callback(data))
        // Chama novamente para verificar se existe outro wm-include dentro da página requisitada
        loadIncludes(el)
      }
    })
  })
}

loadIncludes()
