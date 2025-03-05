exports.ConfirmAccountEmail = (type) => {
  return `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirmation de votre compte</title>
      </head>
      <body>
          <div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2">
              <div style="margin: 50px auto; width: 70%; padding: 20px 0">
                  <div style="border-bottom: 1px solid #eee">
                      <a href="" style="font-size: 1.4em; color: red; text-decoration: none; font-weight: 600">Sym industry</a>
                  </div>
                  <p style="font-size: 1.1em">Bonjour,</p>
                  <p>Nous sommes ravis de vous confirmer que votre compte ${type} a été créé avec succès.</p>
                  <p>Vous pouvez désormais vous connecter et profiter de nos services et nos nouveaux Prix pour les ${type}s.</p>
                  <p>Vous pouvez désormais vous connecter et consulter notre site web via ce lien : <a href="https://sym-industry.com" style="text-decoration: none; color: blue">https://sym-industry.com</a></p>
                  <p style="font-size: 0.9em;">Cordialement,<br />Sym industry</p>
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
