class Config {
  // public WebPort = 4000;
  public WebPort = process.env.PORT; //load from env
  public mySQLPort = process.env.SQL_PORT;
  public host = process.env.DB_HOST;
  public user = process.env.DB_USER;
  public pass = process.env.DB_PASSWORD;
  public database = process.env.DB_NAME;
  public readonly domainName = "http://localhost:" + this.WebPort;
}

  const config = new Config();
  export default config;
  
  // class Config {
  //   public WebPort = 4000;
  //     public mySQLhost = "localhost";
  //     public mySQLuser = "root";
  //     public mySQLpass = "12345678";
  //     public mySQLport = 3306;
  //     public mySQLdatabase = "holiday";
  //     public readonly domainName = "http://localhost:" + this.WebPort;
  
  //   }
    
  //   const config = new Config();
  //   export default config;
    