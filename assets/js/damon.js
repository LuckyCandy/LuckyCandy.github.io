!function (t) {
    t.damon = {};
    t.damon.parseParagraph = function (text) {
        var customStylePattern = /\[(.*?)\]{(.*?)}/g;
        var result = text; // 临时存储替换后的结果

        while ((matches = customStylePattern.exec(text)) !== null) {
            result = result.replace(matches[0], '<span style="' + matches[2] + '">' + matches[1] + '</span>');
        }

        if (result.startsWith('@sentence ')) {
            var pattern = /^@sentence (.*)--(.*)$/;
            var matches = result.match(pattern);
            if (matches) {
                return '<p class="sentence">『 ' + matches[1] + ' 』<span>选自《' + matches[2] + '》</span></p>';
            }
        } else if (result.startsWith('@error ')) {
            return '<p class="tip">' + result.replace('@error ', '') + '</p>'
        } else if (result.startsWith('@info ')) {
            return '<p class="warn">' + result.replace('@info ', '') + '</p>'
        }

        return '<p>' + result + '</p>'
    }
}(window)