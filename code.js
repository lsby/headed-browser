var fs = require('fs')
var path = require('path')

module.exports = async function (api) {
    var { getHtml, runJs, sleep, click } = api

    await runJs(`
        window.location.href='https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E7%8C%AB%E7%8C%AB&step_word=&hs=0&pn=0&spn=0&di=26510&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=2&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=-1&cs=2675811086%2C2654789400&os=1420909221%2C2670757944&simid=2675811086%2C2654789400&adpicid=0&lpn=0&ln=1827&fr=&fmq=1635421577697_R&fm=detail&ic=&s=undefined&hd=&latest=&copyright=&se=&sme=&tab=0&width=&height=&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202107%2F23%2F20210723193548_26f34.thumb.1000_0.jpeg%26refer%3Dhttp%3A%2F%2Fc-ssl.duitang.com%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Djpeg%3Fsec%3D1638013580%26t%3D760a0aa3ab56461e95902078cd5ba56a&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3B17tpwg2_z%26e3Bv54AzdH3Fks52AzdH3F%3Ft1%3D8nc9bcl889&gsm=1&rpstart=0&rpnum=0&islist=&querylist=&nojc=undefined&dyTabStr=MCwyLDMsMSw4LDcsNCw2LDUsOQ%3D%3D'
    `)

    var r = []
    for (var i = 0; i < 10; i++) {
        var x = await getHtml('#currentImg')
        r.push(x)
        await click('#container > span.img-next')
    }

    // fs.writeFileSync(path.resolve(__dirname, './doc/data.txt'), JSON.stringify(r))
}
