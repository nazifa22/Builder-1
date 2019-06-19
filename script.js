$(function() {
  $('.draggable button').hide();
  $(document).on("click", '#content #sortable .draggable', function() {
    draggable = $(this);
    $('.draggable .drag_handle').hide();
    draggable.find('.drag_handle').show();

    $('.draggable button').hide();
    draggable.find('button').show();
  })

  $(document).on("click", function(event) {
    if (!$(event.target).closest('#content .draggable').length) {
      if (typeof draggable !== 'undefined') {
        draggable.find('.drag_handle').hide();
        draggable.find('button').hide();
      }
    }
  })

  $('#content #sortable').sortable({
   
    handle: '.drag_handle',
    placeholder: "ui-state-highlight",
    axis: "y",
    receive: function(event, ui) {
      var ui_helper = ui.helper;
      
      if( ui_helper.hasClass('eloqua') ) {
        ui_helper.find('#contenteditable').html($('#eloqua').html()); 
      }

      else if( ui_helper.hasClass('banner') ) {
        ui_helper.find('#contenteditable').html($('#banner').html());
      }

      else {
        ui_helper.find('#contenteditable').html('different');
      }
    }
  });

  $('#blocks .draggable').draggable({
    helper: "clone",
    revert: "invalid",
    connectToSortable: '#content #sortable'
  });
});

$('.droppable').droppable({
  accept: ".draggable",
  drop: function( event, ui ) {
  var droppable = $(this);
  var draggable = ui.draggable;
  draggable.appendTo(droppable);
  draggable.css({top: '5px', left: '5px'});
  }   
});

$(document).ready(function(){
  $('#blocks').hide();
  $('nav').click(function(){
    $('#blocks').toggle(1000);
  });
});

function copyDivToClipboard() {
  var range = document.createRange();
  range.selectNode(document.getElementById("content"));
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand("copy");
  alert('Copied to clipboard');
}

function delete_div(e) {
  $(e).parent().remove();
}

function clone_div(e) {
  // var $clone_div = $(e).parent(); 
  // console.log($clone_div);
  $(e).parent().clone().appendTo('.ui-sortable');
  console.log($(e).parent().clone().html());
}

function getCode()
{
  $('.modal-body').text($('#sortable').html());
}