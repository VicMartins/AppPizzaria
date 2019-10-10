// This is a JavaScript file
$(document).on('click',"#listarPizza",function(){
    $(location).attr("href","listarPizza.html");
});

$(document).on('click','#salvar',function(){
    var parametros ={
     "sabor":$("#sabor").val(),
     "valor":$("#valor").val()
    };

    $.ajax({
        type:"post",//como vou enviar os dados ao servidor
        url:"https://stey-appropriations.000webhostapp.com/cadastra.php",//para onde vou enviar
        data:parametros,// o que eu vou enviar
        //caso dê certo esse código é executado
        success: function(data){
            navigator.notification.alert(data);
            $("#sabor").val(""),
            $("#valor").val("")
        },
        //caso dê erro esse código é executado
        error: function(data){
            navigator.notification.alert("Erro ao cadastrar!");
        }
    });

  });

  function carregaLista(){
     $.ajax({
        type:"post",//como vou enviar os dados ao servidor
        url:"https://stey-appropriations.000webhostapp.com/listar.php",//para onde vou enviar
        dataType:"json",
        //caso dê certo esse código é executado
        success: function(data){
         var itemlista = "";
         $.each(data.pizzas, function(i,dados){
            itemlista += "<option value="+dados.codigo+">"+dados.sabor+"</option>"
         });
          $("#selectListas").html(itemlista);
        },
        //caso dê erro esse código é executado
        error: function(data){
            navigator.notification.alert("Erro ao buscar registros!");
        }
    });
  }

  $(document).on('change','#selectListas', function(){
    var parametro = {
      "codigo":$("option:selected",('#selectListas')).val()
    };
     $.ajax({
        type:"post",//como vou enviar os dados ao servidor
        url:"https://stey-appropriations.000webhostapp.com/listar-um.php",//para onde vou enviar
        data:parametro,
        dataType:"json",
        //caso dê certo esse código é executado
        success: function(data){
         $("#codigoLista").val(data.pizza.codigo);
         $("#saborLista").val(data.pizza.sabor);
         $("#precoLista").val(data.pizza.valor);
        },
        //caso dê erro esse código é executado
        error: function(data){
            navigator.notification.alert("Erro ao buscar registros!");
        }
    });
  });
   
