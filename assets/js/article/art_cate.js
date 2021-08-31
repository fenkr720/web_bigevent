$(function() {
    layer = layui.layer;
    var form = layui.form;

    function initArtCateList() {
        $.ajax({
            method: "GET",
            url: '/my/article/cates',
            success: function(res) {
                var htmlstr = template('tpl-table', res);
                $('tbody').html(htmlstr);
            }
        })
    }
    initArtCateList();
    $('#btnShowAdd').on('click', function(e) {
        layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    })
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('添加文章分类失败');
                }
                layer.msg('添加文章分类成功');
                initArtCateList();
                layer.closeAll('page'); //关闭所有页面层
            }
        })
    })

    $('tbody').on('click', '.btn-edit', function(e) {
        layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        });
        var id = $(this).attr('data-id');
        $("#form-edit input[name='name']").val($(this).parent().siblings('td').eq(0).html());
        $("#form-edit input[name='alias']").val($(this).parent().siblings('td').eq(1).html());
        $("#form-edit input[name='Id']").val(id);
        // $.ajax({
        //     method: 'GET',
        //     url: '/my/article/cates/' + id,
        //     success: function(res) {
        //         console.log(res);
        //     }
        // })
    })

    // 通过代理的形式，为 btn-edit 按钮绑定点击事件
    // var indexEdit = null
    // $('tbody').on('click', '.btn-edit', function() {
    //     // 弹出一个修改文章分类信息的层
    //     indexEdit = layer.open({
    //         type: 1,
    //         area: ['500px', '250px'],
    //         title: '修改文章分类',
    //         content: $('#dialog-edit').html()
    //     })

    //     var id = $(this).attr('data-id')
    //         // 发起请求获取对应分类的数据
    //     $.ajax({
    //         method: 'GET',
    //         url: '/my/article/cates/' + id,
    //         success: function(res) {
    //             form.val('form-edit', res.data)
    //         }
    //     })
    // })

    // 通过代理的形式，为修改分类的表单绑定 submit 事件
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据成功！')
                    // layer.close(indexEdit)
                initArtCateList()
            }
        })
    })

    // 通过代理的形式，为删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id')
            // 提示用户是否要删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index)
                    initArtCateList()
                }
            })
        })
    })
})