CREATE TABLE account(
	id serial PRIMARY KEY,
	account_name VARCHAR ( 255 ) NOT NULL,
	email VARCHAR ( 255 ) UNIQUE NOT NULL,
    account_money FLOAT);

CREATE TABLE pix(
    id serial PRIMARY KEY,
    pix_key VARCHAR ( 255 ) NOT NULL UNIQUE,
    account_id INT,
    CONSTRAINT fk_account FOREIGN KEY(account_id) REFERENCES account(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE credit_card(
    id serial PRIMARY KEY,
    account_id INT,
    number_credit_card INT NOT NULL,
    cvv int NOT NULL,
    credit_card_bill FLOAT,
    valid DATE NOT NULL, 
    CONSTRAINT fk_account FOREIGN KEY(account_id) REFERENCES account(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE);