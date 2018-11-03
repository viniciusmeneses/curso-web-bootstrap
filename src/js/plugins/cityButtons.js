import $ from 'jquery'
import { onLoadHtmlSuccess } from '../core/includes'

const duration = 600

// Filtra as imagens, escondendo e mostrando as que estão de acordo com o lugar
// passado por parametro
function filterByCity(city) {
  $('[wm-city]').each(function(i, e) {
    // Se for nulo, mostra todas
    const isTarget = $(this).attr('wm-city') === city || city === null

    if (isTarget) {
      $(this).parent().removeClass('d-none')
      $(this).fadeIn(duration)
    }
    else {
      $(this).fadeOut(duration, () => {
        $(this).parent().addClass('d-none')
      })
    }
  })
}

// Filtra as imagens e adiciona/remove a classe active dos botões
function handleClickButton(e, city) {
  filterByCity(city)
  $('[wm-city-buttons]').find('button').removeClass('active')
  $(e.target).addClass('active')
}

// Adiciona o plugin ao jQuery
$.fn.cityButtons = function() {
  // Cria um novo set, pois nele os elementos não podem ser repetidos
  const cities = new Set()

  // Adiciona no Set todos os nomes de cidades sem repetição
  $('[wm-city]').each(function(i, e) {
    cities.add($(e).attr('wm-city'))
  })

  // Cria botões para cada elemento do array de cidades e atribui o evento de click em cada um deles
  const buttons = Array.from(cities).map(city => {
    const btn = $('<button>').addClass(['btn', 'btn-info']).html(city)
    btn.click(e => handleClickButton(e, city))
    return btn
  })

  // Cria um botão a mais para mostrar todas as imagens sem nenhum filtro e adiciona ao array de botões gerado
  const btnAll = $('<button>').addClass(['btn', 'btn-info', 'active']).html('Todas')
  btnAll.click(e => handleClickButton(e, null))
  buttons.push(btnAll)

  // Cria um grupo de botões e adiciona todos os botões do array dentro do grupo
  const btnGroup = $('<div>').addClass(['btn-group'])
  btnGroup.append(buttons)

  // Adiciona o grupo de botões dentro do elemento selecionado pelo jQuery
  $(this).html(btnGroup)
  return this
}

// Adiciona no array de callbacks, uma nova callback para ser executada quando a requisição for concluida
onLoadHtmlSuccess(function() {
  $('[wm-city-buttons]').cityButtons()
})
