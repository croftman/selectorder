(function($) {
    $.fn.selectOrder=function(params) {
        
        var $select = this;
        var idSelect = $select.attr('id');
        var exist = $('.select-order[data-id=' + idSelect + ']').length > 0;
        var $selectOrder;
        var paramsSortable = {};

        if(exist) {
	     	$selectOrder = $('.select-order[data-id=' + idSelect + ']');
	     	$selectOrder.empty();
        } else {
            $selectOrder = $('<ul />').addClass('select-order').attr('data-id', idSelect);
            $selectOrder.on('click', '>li', function() {
            	$(this).parent().children('li').removeClass('active');
				$(this).addClass('active');
            	var value = $(this).data('id');
            	$select.val(value);
            });
        }

        $select.children('option').each(function() {
        	var $option  = $(this);
        	var $li = $('<li />').html($option.text()).attr('data-id', $option.val());
        	$selectOrder.append($li);
        });

        if(params !== undefined) {

        	if(params.url !== undefined) {
        		paramsSortable.items = 'li';
        		paramsSortable.update = function(event, ui) {
        			var listLi = [];
        			var datas = {};
        			if(params.extraParams !== undefined) {
        				datas = params.extraParams;
        			}

		            $selectOrder.children('li').each(function() {
		                listLi.push({
		                     'id' : $(this).attr('data-id'),
		                     'order' : $(this).index()
		                 });
		            });
		            
        			datas.elements = listLi;
        			$.post(params.url, datas, function(result){
				        if(params.callback !== undefined && typeof params.callback === 'function') {
				            callback(result);
				        }
				    }, 'json');
        		};
        	}
        }

        $selectOrder.sortable(paramsSortable);
        $select.hide();
        $select.before($selectOrder);
    };
})(jQuery);
