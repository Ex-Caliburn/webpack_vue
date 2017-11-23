import  crypto from  'crypto-browserify'

var privatePem = `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgQDU0RXnS/BsI7LsBRcyWIxZzTRhjzZB0EYmfYTqYa1ga4XISJDU
E7BWe84m8Cff9I5VqkzMu8hE12vUCBBb7IKyq8k1sa9mgkV1tiLAIvydmm01dE6f
Rt3eKRuTvAyGMIjhKmidiyYKVxv+0JgUEWzFM5uWnSjAffxoQpNRqL2ghwIDAQAB
AoGAX6OHAGb0KOTyJ3cyMYHxsPmzLJS7gWAj5nBKJzq2O7qWaKeTznr6qCMDRiRv
BwpUXNMnqGpLWgSlhKgLEgR7xxXUqX0sPPbYFJVmiPh3AK8EaUlhHiGJsajgcLdr
4+sE1aI+U0edqFThAvfQlFgeONnnwctJCi4Hu9lofXP/GAECQQDyP7bkZw9PFBDl
7/jKCMSNx9KZ60MR/2KLMloPtaaxenfNDgioCGG1Ific5HPkxuNaThILhYzVAgaZ
fR3XDfOHAkEA4OWsH70BQqfjvW5Z57ZDUabg6GnmoaBS6lk8P0zdjwsRcXwwfmsW
pxxXjYwXs8VFCsXjh6JjrvEMFd/MufgrAQJAE0EfL05FuDpXEX+eXaiOvtooEhXR
8edDlN6+q8r7YdXjGchIxdpMsdHuacH6uC9auL3Fz2ahB/kuPxrjuUkhlwJAcbPs
uAco0fhr7eQS1FGT635Bi3+vONwDz7PZ/+7uvVlNMmEla2TdCRQNN+UyPpNn+rBd
/r8dQt9fytdhfEx6AQJAEVvOXtZu6C6yaUvGSylWWWuhwG+G6AlFt5ZUtVnD1ePv
kgGTyTjgN0xlBeJu/yxk+acCsIf6Of1lWPTmpw6t8Q==
-----END RSA PRIVATE KEY-----`
var publicPem = `-----BEGIN CERTIFICATE-----
MIICWDCCAcGgAwIBAgIJAMtFHGkd5JalMA0GCSqGSIb3DQEBCwUAMEUxCzAJBgNV
BAYTAkFVMRMwEQYDVQQIDApTb21lLVN0YXRlMSEwHwYDVQQKDBhJbnRlcm5ldCBX
aWRnaXRzIFB0eSBMdGQwHhcNMTcxMTA4MTEwMTMwWhcNMTcxMjA4MTEwMTMwWjBF
MQswCQYDVQQGEwJBVTETMBEGA1UECAwKU29tZS1TdGF0ZTEhMB8GA1UECgwYSW50
ZXJuZXQgV2lkZ2l0cyBQdHkgTHRkMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKB
gQDU0RXnS/BsI7LsBRcyWIxZzTRhjzZB0EYmfYTqYa1ga4XISJDUE7BWe84m8Cff
9I5VqkzMu8hE12vUCBBb7IKyq8k1sa9mgkV1tiLAIvydmm01dE6fRt3eKRuTvAyG
MIjhKmidiyYKVxv+0JgUEWzFM5uWnSjAffxoQpNRqL2ghwIDAQABo1AwTjAdBgNV
HQ4EFgQUqITQSA50o5JpkanHYJyxbeOX+KswHwYDVR0jBBgwFoAUqITQSA50o5Jp
kanHYJyxbeOX+KswDAYDVR0TBAUwAwEB/zANBgkqhkiG9w0BAQsFAAOBgQBn880r
PPBcHStezwTZEsU2UPE3i1vKHHsWq2y25uvGT6uUyAqsKjwQwpropisgXS9x09JU
c3xmH/ipSHQhjd2EzFgoLEjyMXkdHAlj28aF3RxbYaMJ3o1Y2Ft+nh0gEdtq4er5
pNT8/VHN/BawdtENfrvVnLglIzLu7Xky3q9ZaQ==
-----END CERTIFICATE-----`

// 创签名
var createSign = function createSign() {
  var sign = crypto.createSign('RSA-SHA256');
  sign.update(data);
  var sig = sign.sign(key, 'hex');
  return sig
}

// 验证
var createVerify = function (data, sig) {
  var verify = crypto.createVerify('RSA-SHA256');
  verify.update(data);
  return verify.verify(pubkey, sig, 'hex');
}

var key = privatePem.toString();
var pubkey = publicPem.toString();
//证书

var data = "lijiye";
var sig = createSign(data)
console.log(sig);
console.log(createVerify(data, sig));

export  {createSign, createVerify}
