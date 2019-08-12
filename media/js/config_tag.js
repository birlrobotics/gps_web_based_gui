var iter_tag_source = [
    'all iterations',
    'iter 0',
    'iter 1',
    'iter 2',
    'iter 3',
]

condition_tag_source = [
    'all',
    'cond 0',
    'cond 1',
]

var sample_type_tag_source = [
    'LinGauss Controller', 
    'Dnn Controller',
]


function setup_tag_field() {
    $('#iter_tag').tagEditor({ 
        initialTags: ['all iterations'] ,
        autocomplete: {
            autoFocus: true,
            minLength:0,
            delay: 0,
            source: iter_tag_source,
        },
    })

    $('#condition_tag').tagEditor({ 
        initialTags: ['all conditions'], 
        autocomplete: {
            autoFocus: true,
            minLength:0,
            delay: 0,
            source: condition_tag_source,
        },
    })

    $('#sample_type_tag').tagEditor({ 
        initialTags: ['LinGaussController', 'DnnController'], 
        autocomplete: {
            autoFocus: true,
            minLength:0,
            delay: 0,
            source: sample_type_tag_source,
        },
    })
}

function get_iter_tag() {
    iter_tag = $('#iter_tag').tagEditor('getTags')[0]
    return iter_tag.tags
}

function get_condition_tag() {
    condition_tag = $('#condition_tag').tagEditor('getTags')[0]
    return condition_tag.tags
}

function get_sample_type_tag() {
    sample_type_tag = $('#sample_type_tag').tagEditor('getTags')[0]
    return sample_type_tag.tags
}
