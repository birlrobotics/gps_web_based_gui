var iter_tag_source = [
    'all iterations',
    'iter 0',
    'iter 1',
    'iter 2',
    'iter 3',
]

condition_tag_source = [
    'all conditions',
    'cond 0',
    'cond 1',
]

var sample_type_tag_source = [
    'LinGauss Controller', 
    'Dnn Controller',
]


function setup_tag_field(onChangeCB) {
    function tmp() {
        onChangeCB()
        $.cookie('iter_init_tag', JSON.stringify(get_iter_tag()))
        $.cookie('cond_init_tag', JSON.stringify(get_condition_tag()))
        $.cookie('sample_type_init_tag', JSON.stringify(get_sample_type_tag()))
    }

    try {
        iter_init_tag = JSON.parse(getCookie('iter_init_tag'))
    } catch(err) {
        iter_init_tag = null
    }
    if (iter_init_tag == null) {
        iter_init_tag = ['all iterations']
    }

    $('#iter_tag').tagEditor({ 
        initialTags: iter_init_tag,
        autocomplete: {
            autoFocus: true,
            minLength:0,
            delay: 0,
            source: iter_tag_source,
        },
        onChange:tmp,
    })

    try {
        cond_init_tag = JSON.parse(getCookie('cond_init_tag'))
    } catch(err) {
        cond_init_tag = null
    }
    if (cond_init_tag == null) {
        cond_init_tag = ['all conditions']
    }

    $('#condition_tag').tagEditor({ 
        initialTags: cond_init_tag,
        autocomplete: {
            autoFocus: true,
            minLength:0,
            delay: 0,
            source: condition_tag_source,
        },
        onChange:tmp,
    })

    try {
        sample_type_init_tag = JSON.parse(getCookie('sample_type_init_tag'))
    } catch(err) {
        sample_type_init_tag = null
    } 
    if (sample_type_init_tag == null) {
        sample_type_init_tag = ['LinGauss Controller', 'Dnn Controller']
    }

    $('#sample_type_tag').tagEditor({ 
        initialTags: sample_type_init_tag, 
        autocomplete: {
            autoFocus: true,
            minLength:0,
            delay: 0,
            source: sample_type_tag_source,
        },
        onChange:tmp,
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
