class TrustIssues {
    
    static keepAnEyeOut = function () {

        game.socket.on("module.TrustIssues", (userName) => {
            if (game.user.isGM) {
                ui.notifications.notify(`${game.i18n.localize("TRUSTISSUES.toolsopen")}${userName}`);
            }
        });
        if (!game.user.isGM) {
            function detectDevTool(allow) {
                if (isNaN(+allow)) allow = 300;
                var start = +new Date();
                debugger;
                var end = +new Date();
                if (isNaN(start) || isNaN(end) || end - start > allow) {
                    game.socket.emit("module.TrustIssues", game.user.name);
                }
            }
            if (window.attachEvent) {
                if (document.readyState === "complete" || document.readyState === "interactive") {
                    detectDevTool();
                    window.attachEvent('onresize', detectDevTool);
                    window.attachEvent('onmousemove', detectDevTool);
                    window.attachEvent('onfocus', detectDevTool);
                    window.attachEvent('onblur', detectDevTool);
                } else {
                    setTimeout(argument.callee, 0);
                }
            } else {
                window.addEventListener('load', detectDevTool);
                window.addEventListener('resize', detectDevTool);
                window.addEventListener('mousemove', detectDevTool);
                window.addEventListener('focus', detectDevTool);
                window.addEventListener('blur', detectDevTool);
            }
        }
    }

}

Hooks.once("ready", TrustIssues.keepAnEyeOut);