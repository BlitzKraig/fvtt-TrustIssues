class TrustIssues {

    static keepAnEyeOut = function () {

        game.socket.on("module.TrustIssues", (userName) => {
            if (game.user.isGM) {
                ui.notifications.notify(`${game.i18n.localize("TRUSTISSUES.toolsopen")}${userName}`);
            }
        });
        if (!game.user.isGM) {
            function detectDevTool() {
                let allow = 300; // Time in ms between start & end before notification is triggered
                var start = +new Date();
                debugger;
                var end = +new Date();
                if (isNaN(start) || isNaN(end) || end - start > allow) {
                    game.socket.emit("module.TrustIssues", game.user.name);
                }
            }
            window.addEventListener('load', detectDevTool);
            window.addEventListener('resize', detectDevTool);
            window.addEventListener('mousemove', detectDevTool);
            window.addEventListener('focus', detectDevTool);
            window.addEventListener('blur', detectDevTool);
            setInterval(detectDevTool, 1000);
        }
    }

}

Hooks.once("ready", TrustIssues.keepAnEyeOut);