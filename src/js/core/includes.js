// Importando o jQuery utilizando o sistema de modulos do JS
import $ from 'jquery'

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

        // Chama novamente para verificar se existe outro wm-include dentro da página requisitada
        loadIncludes(el)
      }
    })
  })
}

loadIncludes()
