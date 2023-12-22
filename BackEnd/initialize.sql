CREATE TABLE list_item (
    list_item_id uuid NOT NULL,
    title text NOT NULL,
    completed boolean NOT NULL DEFAULT false,
    created_at timestamp without time zone DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at timestamp without time zone DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    PRIMARY KEY (list_item_id)
);

CREATE TABLE list (
    list_id uuid NOT NULL,
    title text NOT NULL,
    created_at timestamp without time zone DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at timestamp without time zone DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    PRIMARY KEY (list_id)
);

CREATE TABLE list_relationship (
    list_id uuid NOT NULL REFERENCES list (list_id),
    list_item_id uuid NOT NULL REFERENCES list_item (list_item_id),
    created_at timestamp without time zone DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    PRIMARY KEY (list_id, list_item_id)
);

--  to access postgres terminal "sudo -u evergreen  psql -d self_scribe"