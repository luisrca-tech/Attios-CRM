#!/bin/bash

# Example of decrypting a file using gpg
# gpg --quiet --batch --yes --decrypt --passphrase="$TEST_SECRET" \
#     --output ./path/to/decrypted/file \
#     ./path/to/encrypted/file.gpg

# Or using openssl
# openssl enc -aes-256-cbc -d -in ./encrypted_file \
#     -out ./decrypted_file \
#     -pass pass:"$TEST_SECRET"

# Make sure to make this script executable
chmod +x ./decrypt_secret.sh 