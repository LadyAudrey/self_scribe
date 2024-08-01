update tasks set created_on = NOW() - interval '60 days', last_updated = NOW() - interval '60 days', repeats = 't', frequency = '1:1' where id = 45;

self_scribe=> DELETE from task_history where task_id = 45 AND id != 2137;