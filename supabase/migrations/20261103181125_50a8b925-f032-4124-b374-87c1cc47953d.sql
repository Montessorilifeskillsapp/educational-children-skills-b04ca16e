INSERT INTO public.school_invites (school_id, email, role, classroom_ids)
SELECT 'a091e088-b70a-4a83-b006-5ae34de2300c', 'pattyjean.kelly@gmail.com', 'teacher',
 ARRAY['fe28327a-db38-458b-a9a1-6c822e9f810a','b0d04be4-c91d-42dd-8afd-4b01a1e73148','72d63e90-2e35-43ae-b12d-c490c7b6bad4','d47a50aa-72c0-41cd-ad17-a6ff335988a8','65edfe34-ccb7-4133-9d74-9084899d600e','812a88e1-3133-435d-8e9d-a30215cd53a9','e62ed378-0af9-479b-8621-c1d91b02221b']::uuid[]
WHERE NOT EXISTS (SELECT 1 FROM public.school_invites WHERE lower(email)='pattyjean.kelly@gmail.com' AND accepted_at IS NULL);