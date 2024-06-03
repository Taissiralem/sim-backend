exports.ResetPassEmail = (url) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2">
            <div style="margin: 50px auto; width: 70%; padding: 20px 0">
                <div style="border-bottom: 1px solid #eee">
                    <a href="" style="font-size: 1.4em; color: red; text-decoration: none; font-weight: 600">Sym industry</a>
                </div>
                <p style="font-size: 1.1em">Hi,</p>
                <p>Click on the reset button to reset your password. The link is valid for 30 minutes.</p>
                <a href=${url} style="background: red; margin: 0 auto; width: max-content; padding: 0 10px; color: #fff; border-radius: 4px; text-decoration: none; display: inline-block;">Reset</a>
                <p style="font-size: 0.9em;">Regards,<br />Sym industry</p>
                <hr style="border: none; border-top: 1px solid #eee" />
                <div style="float: right; padding: 8px 0; color: #aaa; font-size: 0.8em; line-height: 1; font-weight: 300">
                    <p>Sym industry</p>
                    <p>2023</p>
                    <p>Algeria</p>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
};
