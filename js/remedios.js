$(function() {
  var text = document.querySelector('textarea'),
      autocomplete = document.querySelector('.autocomplete'),
      getCoord = function(e) {
        var carPos = text.selectionEnd,
          div = document.createElement('div'),
          span = document.createElement('span'),
          copyStyle = getComputedStyle(text),
          coords = {};
        [].forEach.call(copyStyle, function(prop){
          div.style[prop] = copyStyle[prop];
        });
        div.style.position = 'absolute';
        document.body.appendChild(div);
        div.textContent = text.value.substr(0, carPos);
        span.textContent = text.value.substr(carPos) || '.';
        div.appendChild(span);
        coords = {
          TOP: span.offsetTop,
          LEFT: 0
        };
        //console.log(coords);
        if (e.type == 'click') {
          $('textarea').attr('class', 'typing').css({backgroundPosition: '10px '+ (coords.TOP - 10) +'px'});
        } else {
          $('textarea').attr('class', 'searching').css({backgroundPosition: '10px '+ (coords.TOP - 10) +'px'});
          autocomplete.style.display = 'block';
          autocomplete.style.left = text.offsetLeft - text.scrollLeft + coords.LEFT + 'px';
          autocomplete.style.top  = text.offsetTop - text.scrollTop + coords.TOP  + 50 + 'px';
        }
        document.body.removeChild(div);
      }
      loadResults = function() {
        var medicamentos = [
          {
            fabricante: 'Roche',
            nome: 'Roacutan 20mg, Cápsula (30un)',
            precoMax: 22.10,
            precoMin: 20.99,
            principioAtivo: 'Isotretinoína 20mg',
            titularidade: 'Referência'
          },
          {
            fabricante: 'Sundown Vitaminas',
            nome: 'Vitamina C, comprimido (100un)',
            precoMax: 45.15,
            precoMin: 31.99,
            principioAtivo: 'Ácido Ascórbico',
            titularidade: 'Referência'
          },
          {
            fabricante: 'Sundown Vitaminas',
            nome: 'Vitamina C, comprimido (180un)',
            precoMax: 10.00,
            precoMin: 10.00,
            principioAtivo: 'Ácido Ascórbico',
            titularidade: 'Genérico'
          },
          {
            fabricante: 'EMS Sigma Pharma',
            nome: 'Itraspor 100mg, Cápsula (15un)',
            precoMax: 209.00,
            precoMin: 100.00,
            principioAtivo: 'Itraconazol 100mg',
            titularidade: 'Genérico'
          },
          {
            fabricante: 'EMS Sigma Pharma',
            nome: 'Itraspor 100mg, Cápsula (28un)',
            precoMax: 15.00,
            precoMin: 9.99,
            principioAtivo: 'Itraconazol 100mg',
            titularidade: 'Referência'
          },
          {
            fabricante: 'Abbott',
            nome: 'Cloridrato de sibutramina 15mg, Cápsula (30un)',
            precoMax: 40.00,
            precoMin: 40.00,
            principioAtivo: 'Cloridrato de sibutramina 15mg',
            titularidade: 'Genérico'
          },
          {
            fabricante: 'Abbott',
            nome: 'Cloridrato de sibutramina 15mg, Cápsula (100un)',
            precoMax: 200.00,
            precoMin: 100.00,
            principioAtivo: 'Cloridrato de sibutramina 15mg',
            titularidade: 'Referência'
          }
        ];

        $('.autocomplete ul.resultados').html();
        $.each(medicamentos, function( index, value ) {
          if(value.titularidade == 'Referência') {
            className = 'referencia';
          } else if(value.titularidade == 'Genérico') {
            className = 'generico';
          }
          var precomin = 'R$ '+ (value.precoMin).toFixed(2);
              precomin = precomin.replace('.', ',');
          var precomax = 'R$ '+ (value.precoMax).toFixed(2);
              precomax = precomax.replace('.', ',');
          var item = '<li data-id-medicamento="'+ (index + 1) +'" class="'+ className +'">';
              item += ' <div class="descricao">';
              item += '   <span class="nome">'+ value.nome +'</span>';
              item += '   <span class="principio-ativo">'+ value.principioAtivo +'</span>';
              item += ' </div>';
              item += ' <div class="fabricacao">';
              item += '   <span class="fabricante">'+ value.fabricante +'</span>';
              item += '   <span class="titularidade">'+ value.titularidade +'</span>';
              item += ' </div>';
              item += ' <div class="preco">';
              if (precomin != precomax) {
                item += '   <span class="preco-de">de '+ precomin +'</span>';
                item += '   <span class="preco-ate">até '+ precomax +'</span>';
              } else {
                item += '   <span class="valor">'+ precomin +'</span>';
              }
              item += ' </div>';
              item += '</li>';
          $('.autocomplete ul.resultados').append(item);
          $('.autocomplete ul.resultados li').unbind('click').bind('click', function() {
            var textToAdd = $('textarea').val(); 
            var lines = textToAdd.split('\n');
                lines.splice(-1,1);
                textToAdd = lines.join('\n');
                textToAdd += $(this).children('.descricao').children('.nome').text();
                textToAdd += ', '+ $(this).children('.fabricacao').children('.fabricante').text() +'\n\n\n';
            $('textarea').val(textToAdd).focus().attr('class', 'typing');
            $('.autocomplete').hide();
          });
        });
      };
  text.addEventListener('click', getCoord);
  text.addEventListener('keyup', getCoord);
  text.addEventListener('keyup', loadResults);
});