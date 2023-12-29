CREATE TABLE list (
    list_id uuid NOT NULL,
    title text NOT NULL,
    created_at timestamp without time zone DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at timestamp without time zone DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    PRIMARY KEY (list_id)
);

CREATE TABLE list_item (
    list_item_id uuid NOT NULL,
    list_id uuid NOT NULL,
    title text NOT NULL,
    completed boolean NOT NULL DEFAULT false,
    created_at timestamp without time zone DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at timestamp without time zone DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    PRIMARY KEY (list_item_id),
    FOREIGN KEY (list_id) REFERENCES list (list_id)
);

--  to access postgres terminal "sudo -u evergreen  psql -d self_scribe"