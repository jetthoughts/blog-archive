title: OpenSSL with Nginx and untrusted CA
author: Michael Nikitochkin
date: 2009/10/23
tags: linux,nginx,ssl,certificate

<p>
Поставили на работе задачу установить <strong>ssl</strong> сертификат для работы веб приложения. Веб сервер был <strong>nginx</strong>, а провайдера бесплатного нашли http://www.instantssl.com/ *COMODO*.</p>

<p>Сотрудник, Саша Локшин помог в этом вопросе и выдал алгоритм создания ключика и его подписывание провайдером. И дал документацию простейшую http://www.rapidssl.com/resources/csr/apache_mod_ssl.htm. И в прям весь процесс генерации прошел быстро, поля так же заполнил по предложеному формату. Не вводил секретных фраз и не заполнял <strong>extra</strong>атрибутов:
</p>

<pre># openssl genrsa -out domain.com.key
Generating RSA private key, 2048 bit long modulus

# openssl req -new -key domain.com.key -out domain.com.csr
....
</pre><p>
Получилось два файла. Теперь время регистрации у провайдера. Там все просто так же. Нам нужно скопировать контент файла domain.com.csr и запостить его в поле.
</p><pre># cat domain.com.csr</pre><p>
После, сервис выслал письмо активации админу домена на мыло admin@domain.com, и после активации сертификата он выслал мне на почту архив с описанием:
</p>
<pre>    
    * Root CA Certificate - AddTrustExternalCARoot.crt
    * Intermediate CA Certificate - UTNAddTrustSGCCA.crt
    * Intermediate CA Certificate - ComodoUTNSGCCA.crt
    * Intermediate CA Certificate - EssentialSSLCA_2.crt
    * Your Free SSL Certificate - domain_com.crt
</pre><p>
Вот я думал и все приключения. Соотвественно манюалу nginx создал конфиг для приложения.
</p><pre>ssl    on;
ssl_certificate    /etc/ssl/private/domain_com.crt; (or .pem)
ssl_certificate_key    /etc/ssl/private/domain.com.key;
</pre><p>
Все отлично. Запустилось, но вот дела, захожу на страницу и выдает ошибка, что не известный сертификат. Часик танца с бубном нашел статью http://terra-firma-design.com/blog/20-Installing-an-EV-SSL-Certificate-on-Nginx.  Где они объясняют метод передачи нескольких сертификатов в один для nginx. В apache такого не нужно, ему можно задать каталог этих сертификатов.
</p><pre># cat  AddTrustExternalCARoot.crt EssentialSSLCA_2.crt ComodoUTNSGCCA.crt UTNAddTrustSGCCA.crt domain_com.crt &gt;&gt; domain_com_new.crt
</pre>

И подправил соотвественно конфиг nginx. Затем перезапускаю сервер и вуаля вылетает ошибка.
<pre>Restarting nginx: [emerg]: invalid number of arguments in "ssl_certificate" directive in /opt/nginx/conf/production.conf:54</pre>

Вот думаю отлично. Потом нашел форум, где обсуждали подубную ситуацию. И парень предложил проверить ключ и полученный сертификат. Сказал что поля Modulus тоже совпадать

<pre># openssl x509 -noout -text -in domain_com.crs
................
            RSA Public Key: (1024 bit)
                Modulus (1024 bit):
                    00:bb:e1:e7:7a:63:b8:eb:14:e4:44:93:11:1e:25:
                    e4:52:07:5c:d1:33:5d:e2:84:88:4c:24:3a:bb:61:
                    32:35:fe:51:02:73:fb:2e:09:86:9c:54:3f:dc:e0:
                    11:d1:b7:4c:4f:a8:f9:fa:ab:e4:a7:a1:22:f5:43:
                    b3:b6:a9:f4:84:4a:89:33:63:d3:3b:e5:9f:11:65:
                    31:0a:84:0b:6e:b3:62:75:42:40:ac:17:cc:3e:9b:
                    eb:46:04:25:3a:43:be:3c:73:57:04:8b:f0:f2:45:
                    ad:4c:5c:f5:38:fb:66:bc:7f:b0:30:5e:ab:7d:73:
                    af:1d:2c:a6:0f:01:5d:25:d9
................
# openssl x509 -noout -text -in /opt/nginx/cert/domain_com.crt
..............
            RSA Public Key: (2048 bit)
                Modulus (2048 bit):
                    00:b7:89:02:04:4e:4c:9b:cd:29:be:e9:3e:fa:74:
                    44:6b:8e:bd:58:91:68:82:cb:3c:06:c9:2a:fe:19:
                    95:b1:21:29:a0:94:94:5b:58:30:bb:bd:5b:d5:ca:
                    79:4c:c2:d0:65:1e:d8:e8:2e:91:c6:5d:c0:55:49:
                    d1:9d:a7:ec:38:d9:be:db:21:1a:59:b3:56:d7:6f:
                    94:18:ec:65:38:35:82:9d:c5:80:f5:48:07:77:fc:
                    07:4f:50:8e:df:a3:bf:07:49:2b:9a:91:be:c8:a5:
                    b4:9e:1e:aa:b1:6d:c8:aa:ea:64:a3:da:13:27:7d:
                    80:92:0e:41:de:3a:54:95:d4:75:24:2a:17:35:27:
                    e2:00:10:d2:c0:22:24:e9:32:84:49:d4:eb:ba:f0:
                    e3:de:ee:0d:90:e6:23:62:aa:51:6c:57:3f:46:00:
                    5d:3c:35:64:24:f5:ab:ea:f7:21:22:91:46:48:e5:
                    af:35:ea:03:bd:3b:fb:80:d7:38:cd:46:16:9a:34:
                    ee:f4:96:24:2c:37:dc:27:87:3f:c2:b9:f9:d0:66:
                    eb:90:c9:19:6b:87:c3:f7:f1:d0:c2:c6:68:a8:5a:
                    71:e7:b8:79:6b:d0:c6:cd:88:0c:cf:d5:c4:67:0f:
                    da:47:ad:6e:c1:72:5e:f2:30:64:2f:14:7c:4d:d5:
                    5c:5d
            ......
</pre>

Увидел тот факт что они разные. И что провайдер мне подписал ключ 2048 битным шифром. А у меня по умолчанию 1024. Я решил переделать ключ, но только 2048 бит установить.

<pre># openssl genrsa -out domain_com.key 2048
# openssl req -new -key domain_com.key -out domain_com.csr
</pre>

За полчаса добазарился с провайдером о замене csr файла и о выдаче нового сертификата. Попробывал опять чистый сертификат и мои ключ. Не получилось.
Тогда я объединил все сертификаты в один методом:
<pre># cat  AddTrustExternalCARoot.crt EssentialSSLCA_2.crt ComodoUTNSGCCA.crt UTNAddTrustSGCCA.crt domain_com.crt &gt;&gt; domain_com_new.crt
</pre>
При загрузки веб сервера вылетает ошибка такая же как и в прошлый раз. Тогда решил проверить инфу такого сертификата:
<pre># openssl x509 -noout -text -in ssl-bundle.crt -modulus
</pre>
Он выдал всего лишь первый сертификат из списка. Тогда я решил немного поменять методы склейки сертфикатов, и сделать так что сертификат моего домена был выше и проверить инфу:

<pre># cat domain_com.crt AddTrustExternalCARoot.crt EssentialSSLCA_2.crt ComodoUTNSGCCA.crt UTNAddTrustSGCCA.crt &gt; domain_com_2.crt
# openssl x509 -noout -text -in ssl-bundle.crt -modulus
</pre>

Как и ожидалось, он выдал инфу только по нужном сертификате. Перегружаем веб сервер и вуаля он запустился. Заходим на страничку и он видит нормально сертификат без всяких ошибок и окошек.
