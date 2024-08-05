(async () => {
    const data = {
        username: '思源派网站用户名',
        password: '思源派网站密码',
        post_title: 'Sample Title', //纯文本
        post_content: '<h1>Sample Content</h1>', //应该传入HTML语法
        post_category: 1, //分类ID，见文章末尾
        tag: 'Tag1,Tag2,Tag3' //多个标签用英文逗号隔开
    };

    try {
        const response = await fetch('https://api.sypai.cc/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.text();
            console.log(result);
        } else {
            console.error('Error:', response.status, response.statusText);
        }
    } catch (error) {
        console.error(error);
    }
})();
