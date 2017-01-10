var questionIndex = 0;
$(document).ready(function(){
	$('body').on('click','.add-question',function(){
		$('.firstQuestion').clone()
		.removeClass('firstQuestion').insertAfter($(this).closest('.single')).end();
		reindex();
	});
	
	$('body').on('click','.add-video',function(){
		$('.firstVideo').clone()
		.removeClass('firstVideo').insertAfter($(this).closest('.single')).end();
		reindex();
	});
	
	$('body').on('click','.multipleChoice',function(){
		if ($(this).is(':checked')) $(this).closest('.single').find('.multipleChoiceBox').show();
	});
	
	$('body').on('click','.textResponce',function(){
		if ($(this).is(':checked')) $(this).closest('.single').find('.multipleChoiceBox').hide();
	});
	
	$('body').on('click','.remove',function(){
		if ($('.single:visible').size() > 1)
		{
			$(this).closest('.single').remove();
			reindex();
		}
	});	
	
	
	$('.add-video:first').click();
});

function reindex()
{
	var index = 0;
	$('.single:visible').each(function(){
		$(this).find('input.type').attr('name', 'object['+(index)+'][type]').end()
		.find('.textResponce, .multipleChoice').attr('name', 'object['+(index)+'][questionType]').end()
		.find('.multipleChoiceAnswer').attr('name', 'object['+(index)+'][multipleChoiceAnswer]').end()
		.find('.videoLabel').attr('name', 'object['+(index)+'][videoLabel]').end()
		.find('.videoUrl').attr('name', 'object['+(index)+'][videoUrl]').end()
		.find('.questionText').attr('name', 'object['+(index)+'][questionText]').end()
		.find('.answerA').attr('name', 'object['+(index)+'][answerA]').end()
		.find('.answerB').attr('name', 'object['+(index)+'][answerB]').end()
		.find('.answerC').attr('name', 'object['+(index)+'][answerC]').end();
		index++;
	});
}